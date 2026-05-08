import { NextResponse } from 'next/server'
import { getUserFromCookie } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const userData = await getUserFromCookie()
    
    if (!userData) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        xp: true,
        gems: true,
        level: true,
        dayStreak: true,
        masteredPhrases: true,
        masteredWords: true,
        streakDays: true,
        _count: {
          select: { srsRecords: true }
        }
      },
      orderBy: { xp: 'desc' },
      take: 50
    })

    const ranking = users.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      name: user.name,
      xp: user.xp,
      gems: user.gems,
      level: user.level,
      dayStreak: user.dayStreak,
      streakDays: user.streakDays,
      masteredPhrases: user.masteredPhrases,
      masteredWords: user.masteredWords,
      totalCards: user._count.srsRecords,
      isMe: user.id === userData.id,
    }))

    const myRank = ranking.find(r => r.id === userData.id)
    const myIndex = ranking.findIndex(r => r.id === userData.id)

    return NextResponse.json({
      ranking,
      myRank: myRank ? { ...myRank, rank: myIndex + 1 } : null,
      totalUsers: users.length
    })
  } catch (error) {
    console.error('Ranking error:', error)
    return NextResponse.json({ error: 'Erro ao buscar ranking' }, { status: 500 })
  }
}