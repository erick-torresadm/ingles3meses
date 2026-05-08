import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { extractKeyWords } from '@/lib/srs'

export async function POST(request: Request) {
  const body = await request.json()
  const { text, translation, level } = body

  if (!text) return NextResponse.json({ error: 'text required' }, { status: 400 })

  // Verifica duplicata
  const existing = await prisma.phrase.findUnique({ where: { text } })
  if (existing) return NextResponse.json({ error: 'Phrase already exists' }, { status: 409 })

  // Cria a frase
  const phrase = await prisma.phrase.create({
    data: {
      text,
      translation: translation || null,
      level: level || 'A1'
    }
  })

  // Extrai palavras-chave e cria/vincula
  const wordTexts = extractKeyWords(text)
  for (const wt of wordTexts) {
    let word = await prisma.word.findUnique({ where: { word: wt } })
    if (!word) {
      word = await prisma.word.create({
        data: { word: wt, level: level || 'A1' }
      })
    }

    await prisma.phraseWord.create({
      data: { phraseId: phrase.id, wordId: word.id }
    }).catch(() => {}) // ignora duplicata
  }

  // Cria SRS record para a frase
  await prisma.sRSRecord.create({
    data: {
      phraseId: phrase.id,
      entityType: 0,
      status: 'new',
      nextReview: new Date(),
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0
    }
  })

  return NextResponse.json(phrase)
}
