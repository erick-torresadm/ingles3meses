import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, createToken, setAuthCookie, UserPayload } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, password } = body

    if (!email || !name || !password) {
      return NextResponse.json({ error: 'Preencha todos os campos' }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 })
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
        level: 'A1',
        targetLevel: 'C1',
      },
    })

    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      level: user.level,
    }

    const token = createToken(payload)

    const response = NextResponse.json({ 
      user: { id: user.id, name: user.name, email: user.email, level: user.level } 
    })

    response.cookies.set(setAuthCookie(token))

    return response
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Erro ao criar conta' }, { status: 500 })
  }
}