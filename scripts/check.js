const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function check() {
  const phrases = await prisma.phrase.count()
  const words = await prisma.word.count()
  const links = await prisma.phraseWord.count()
  console.log(`Frases: ${phrases}, Palavras: ${words}, Links: ${links}`)
  await prisma.$disconnect()
}
check()