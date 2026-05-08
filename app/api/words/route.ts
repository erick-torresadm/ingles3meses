import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const words = await prisma.word.findMany({
    include: {
      phrases: { include: { phrase: { select: { text: true, translation: true, level: true } } } },
      srsRecords: { where: { entityType: 1 } }
    },
    orderBy: { id: 'desc' }
  })
  return NextResponse.json(words)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { word, translation, phonetics, level, partOfSpeech } = body

  const newWord = await prisma.word.create({
    data: {
      word,
      translation: translation || null,
      phonetics: phonetics || null,
      level: level || 'A1',
      partOfSpeech: partOfSpeech || null
    }
  })

  return NextResponse.json(newWord)
}
