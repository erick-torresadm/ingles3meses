import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const now = new Date()

  const [totalPhrases, totalWords, phraseDue, wordDue, graduated, newCount] = await Promise.all([
    prisma.phrase.count(),
    prisma.word.count(),
    prisma.sRSRecord.count({
      where: { entityType: 0, phraseId: { not: null }, nextReview: { lte: now }, status: { in: ['new', 'learning', 'review'] } }
    }),
    prisma.sRSRecord.count({
      where: { entityType: 1, wordId: { not: null }, nextReview: { lte: now }, status: { in: ['available', 'learning', 'review'] } }
    }),
    prisma.sRSRecord.count({
      where: { status: 'graduated' }
    }),
    prisma.phrase.count({
      where: {
        srsRecords: { none: { entityType: 0 } }
      }
    })
  ])

  return NextResponse.json({
    totalPhrases,
    totalWords,
    dueToday: phraseDue + wordDue,
    phrasesDue: phraseDue,
    wordsDue: wordDue,
    newPhrases: newCount,
    newWords: await prisma.word.count({
      where: {
        srsRecords: { none: { entityType: 1 } }
      }
    }),
    graduated,
    progress: totalPhrases > 0 ? Math.round((graduated / totalPhrases) * 100) : 0
  })
}
