import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  await prisma.word.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
