import { NextResponse } from 'next/server'
import { getUserFromCookie } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    const userData = await getUserFromCookie()
    
    if (!userData) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const existingRecords = await prisma.sRSRecord.count({
      where: { userId: userData.id }
    })

    if (existingRecords > 0) {
      return NextResponse.json({ message: 'Usuário já inicializado' })
    }

    const allPhrases = await prisma.phrase.findMany({
      select: { id: true, level: true }
    })

    const allWords = await prisma.word.findMany({
      select: { id: true, level: true }
    })

    const now = new Date()

    const phraseRecords = allPhrases.map(p => ({
      userId: userData.id,
      phraseId: p.id,
      entityType: 0,
      status: 'new',
      nextReview: new Date(now.getTime() + Math.random() * 86400000 * 2),
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
    }))

    const wordRecords = allWords.map(w => ({
      userId: userData.id,
      wordId: w.id,
      entityType: 1,
      status: 'locked',
      nextReview: now,
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
    }))

    await prisma.sRSRecord.createMany({
      data: [...phraseRecords, ...wordRecords],
    })

    await prisma.user.update({
      where: { id: userData.id },
      data: {
        totalPhrases: allPhrases.length,
        totalWords: allWords.length,
      }
    })

    return NextResponse.json({ 
      message: 'Inicializado com sucesso',
      phrasesCreated: allPhrases.length,
      wordsCreated: allWords.length,
    })
  } catch (error) {
    console.error('Init error:', error)
    return NextResponse.json({ error: 'Erro ao inicializar' }, { status: 500 })
  }
}