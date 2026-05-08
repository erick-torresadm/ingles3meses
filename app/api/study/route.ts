import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { processReview, shouldReleaseWords } from '@/lib/srs'
import { getUserFromCookie } from '@/lib/auth'

// GET: Busca cartões para estudar
export async function GET() {
  const userData = await getUserFromCookie()
  
  if (!userData) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const now = new Date()

  // 1. Frases vencidas (prioridade máxima)
  const duePhrases = await prisma.sRSRecord.findMany({
    where: {
      userId: userData.id,
      phraseId: { not: null },
      wordId: null,
      nextReview: { lte: now },
      entityType: 0,
      status: { in: ['new', 'learning', 'review'] }
    },
    include: { phrase: true },
    orderBy: { nextReview: 'asc' },
    take: 25
  })

  // 2. Palavras liberadas vencidas
  const dueWords = await prisma.sRSRecord.findMany({
    where: {
      userId: userData.id,
      wordId: { not: null },
      phraseId: null,
      nextReview: { lte: now },
      entityType: 1,
      status: { in: ['available', 'learning', 'review'] }
    },
    include: { word: true },
    orderBy: { nextReview: 'asc' },
    take: 15
  })

  // 3. Novas frases (status new)
  const newPhrases = await prisma.sRSRecord.findMany({
    where: {
      userId: userData.id,
      entityType: 0,
      status: 'new'
    },
    include: { phrase: true },
    take: 10
  })

  return NextResponse.json({
    phrases: { due: duePhrases, new: newPhrases },
    words: { due: dueWords }
  })
}

// POST: Processa avaliação
export async function POST(request: NextRequest) {
  const userData = await getUserFromCookie()
  
  if (!userData) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const body = await request.json()
  const { recordId, phraseId, wordId, rating } = body

  if (recordId) {
    return await processRating(userData.id, recordId, rating)
  }

  if (phraseId) {
    const record = await prisma.sRSRecord.create({
      data: {
        userId: userData.id,
        phraseId,
        entityType: 0,
        status: 'learning',
        nextReview: new Date(),
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0
      }
    })
    return await processRating(userData.id, record.id, rating)
  }

  if (wordId) {
    const record = await prisma.sRSRecord.create({
      data: {
        userId: userData.id,
        wordId,
        entityType: 1,
        status: 'learning',
        nextReview: new Date(),
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0
      }
    })
    return await processRating(userData.id, record.id, rating)
  }

  return NextResponse.json({ error: 'Requisição inválida' }, { status: 400 })
}

async function processRating(userId: number, recordId: number, rating: number) {
  const record = await prisma.sRSRecord.findUnique({
    where: { id: recordId },
    include: {
      phrase: { include: { words: true } },
      word: true
    }
  })

  if (!record) {
    return NextResponse.json({ error: 'Registro não encontrado' }, { status: 404 })
  }

  const result = processReview(
    rating,
    record.easeFactor,
    record.interval,
    record.repetitions
  )

  const updated = await prisma.sRSRecord.update({
    where: { id: recordId },
    data: {
      easeFactor: result.easeFactor,
      interval: result.interval,
      repetitions: result.repetitions,
      nextReview: result.nextReview,
      status: result.status,
      totalReviews: record.totalReviews + 1,
      correctReviews: rating >= 2 ? record.correctReviews + 1 : record.correctReviews,
      lastReview: new Date()
    }
  })

  if (record.phrase && shouldReleaseWords(result.status, result.repetitions)) {
    await releasePhraseWords(userId, record.phrase.id)
  }

  if (result.status === 'graduated' && record.phraseId) {
    await prisma.user.update({
      where: { id: userId },
      data: { masteredPhrases: { increment: 1 } }
    })
  }

  if (result.status === 'graduated' && record.wordId) {
    await prisma.user.update({
      where: { id: userId },
      data: { masteredWords: { increment: 1 } }
    })
  }

  return NextResponse.json({
    ...updated,
    intervalText: result.intervalText
  })
}

async function releasePhraseWords(userId: number, phraseId: number) {
  const phraseWords = await prisma.phraseWord.findMany({
    where: { phraseId },
    include: { word: true }
  })

  for (const pw of phraseWords) {
    const existing = await prisma.sRSRecord.findFirst({
      where: { userId, wordId: pw.wordId, entityType: 1 }
    })

    if (!existing) {
      await prisma.sRSRecord.create({
        data: {
          userId,
          wordId: pw.wordId,
          entityType: 1,
          status: 'available',
          nextReview: new Date(Date.now() + Math.random() * 86400000),
          easeFactor: 2.5,
          interval: 0,
          repetitions: 0
        }
      })
    } else if (existing.status === 'locked' || existing.status === 'new') {
      await prisma.sRSRecord.update({
        where: { id: existing.id },
        data: { status: 'available', nextReview: new Date(Date.now() + Math.random() * 86400000) }
      })
    }
  }
}