import { NextResponse } from 'next/server'
import { getUserFromCookie } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function calculateEnglishLevel(records: any[]): string {
  if (records.length === 0) return 'A1'

  const graduatedPhrases = records.filter(r => r.status === 'graduated' && r.entityType === 0)
  const learningPhrases = records.filter(r => r.status === 'learning' && r.entityType === 0)
  const reviewPhrases = records.filter(r => r.status === 'review' && r.entityType === 0)
  
  const graduatedWords = records.filter(r => r.status === 'graduated' && r.entityType === 1)
  const learningWords = records.filter(r => r.status === 'learning' && r.entityType === 1)

  const totalPhrases = graduatedPhrases.length + learningPhrases.length + reviewPhrases.length
  const totalWords = graduatedWords.length + learningWords.length

  const masteredPhrasesCount = graduatedPhrases.length + reviewPhrases.length
  const masteredWordsCount = graduatedWords.length

  const avgEase = records.reduce((acc, r) => acc + (r.easeFactor || 2.5), 0) / records.length

  const totalCorrect = records.reduce((acc, r) => acc + (r.correctReviews || 0), 0)
  const totalReviews = records.reduce((acc, r) => acc + (r.totalReviews || 0), 0)
  const accuracy = totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0

  const hasLongIntervals = records.some(r => (r.interval || 0) > 21)

  const score = {
    phrasesMastered: masteredPhrasesCount,
    wordsMastered: masteredWordsCount,
    totalPhrases,
    totalWords,
    accuracy,
    avgEase,
    hasLongIntervals,
  }

  if (score.phrasesMastered >= 200 && score.wordsMastered >= 100 && score.accuracy >= 85 && hasLongIntervals) {
    return 'C2'
  }
  if (score.phrasesMastered >= 150 && score.wordsMastered >= 80 && score.accuracy >= 80) {
    return 'C1'
  }
  if (score.phrasesMastered >= 100 && score.wordsMastered >= 50 && score.accuracy >= 75) {
    return 'B2'
  }
  if (score.phrasesMastered >= 60 && score.wordsMastered >= 30 && score.accuracy >= 70) {
    return 'B1'
  }
  if (score.phrasesMastered >= 30 && score.wordsMastered >= 15 && score.accuracy >= 65) {
    return 'A2'
  }
  return 'A1'
}

function calculateStreak(lastStudyDate: Date | null): number {
  if (!lastStudyDate) return 0

  const now = new Date()
  const diffTime = now.getTime() - lastStudyDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0 || diffDays === 1) return 1
  if (diffDays > 1) return 0
  
  return 1
}

export async function GET() {
  try {
    const userData = await getUserFromCookie()
    
    if (!userData) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const records = await prisma.sRSRecord.findMany({
      where: { userId: userData.id },
      select: {
        status: true,
        entityType: true,
        easeFactor: true,
        interval: true,
        totalReviews: true,
        correctReviews: true,
        nextReview: true,
      }
    })

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)

    const dueRecords = records.filter(r => new Date(r.nextReview) <= tomorrow)
    const dueCards = dueRecords.length

    const todayRecords = records.filter(r => {
      const reviewDate = new Date(r.lastReview)
      return reviewDate >= today
    })
    const todayReviews = todayRecords.length

    const learnedPhrases = records.filter(r => 
      r.entityType === 0 && (r.status === 'graduated' || r.status === 'review')
    ).length

    const learnedWords = records.filter(r => 
      r.entityType === 1 && (r.status === 'graduated' || r.status === 'review')
    ).length

    const totalCorrect = records.reduce((acc, r) => acc + (r.correctReviews || 0), 0)
    const totalReviews = records.reduce((acc, r) => acc + (r.totalReviews || 0), 0)
    const accuracy = totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0

    const currentLevel = calculateEnglishLevel(records)

    const user = await prisma.user.findUnique({
      where: { id: userData.id },
      select: { lastStudyDate: true, streakDays: true }
    })

    const newStreak = user?.streakDays || 0

    if (todayReviews > 0 && user) {
      const lastDate = user.lastStudyDate ? new Date(user.lastStudyDate) : null
      const streak = calculateStreak(lastDate)
      
      if (streak > 0) {
        await prisma.user.update({
          where: { id: userData.id },
          data: {
            streakDays: user.streakDays + 1,
            lastStudyDate: now,
            level: currentLevel,
          }
        })
      }
    }

    return NextResponse.json({
      todayReviews,
      dueCards,
      learnedPhrases,
      learnedWords,
      accuracy,
      currentStreak: newStreak,
      level: currentLevel,
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ error: 'Erro ao buscar estatísticas' }, { status: 500 })
  }
}