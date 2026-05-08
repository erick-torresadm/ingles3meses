import { NextResponse } from 'next/server'
import { getUserFromCookie } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const userData = await getUserFromCookie()
    
    if (!userData) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userData.id },
      select: {
        id: true,
        email: true,
        name: true,
        level: true,
        targetLevel: true,
        totalPhrases: true,
        totalWords: true,
        masteredPhrases: true,
        masteredWords: true,
        streakDays: true,
        lastStudyDate: true,
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ error: 'Erro ao verificar auth' }, { status: 500 })
  }
}