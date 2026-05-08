const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const phrases = [
  // A1 - Básico
  { text: "Hello, how are you doing today?", translation: "Olá, como você está hoje?", level: "A1" },
  { text: "My name is John, nice to meet you.", translation: "Meu nome é John, prazer em conhecê-lo.", level: "A1" },
  { text: "I am learning English to travel abroad.", translation: "Estou aprendendo inglês para viajar para o exterior.", level: "A1" },
  { text: "She lives in a big house near the park.", translation: "Ela mora em uma casa grande perto do parque.", level: "A1" },
  { text: "We go to school every morning by bus.", translation: "Nós vamos para a escola toda manhã de ônibus.", level: "A1" },
  { text: "The cat is sleeping on the sofa right now.", translation: "O gato está dormindo no sofá agora.", level: "A1" },
  { text: "I like to read books before going to bed.", translation: "Eu gosto de ler livros antes de ir para a cama.", level: "A1" },
  { text: "Can you help me with my homework please?", translation: "Você pode me ajudar com minha lição de casa por favor?", level: "A1" },
  { text: "The weather is very nice today, let's go outside.", translation: "O tempo está muito bom hoje, vamos lá fora.", level: "A1" },
  
  // A2 - Básico+
  { text: "I usually have breakfast at seven o'clock in the morning.", translation: "Eu geralmente tomo café da manhã às sete horas da manhã.", level: "A2" },
  { text: "She went to the supermarket to buy some groceries.", translation: "Ela foi ao supermercado comprar algumas compras.", level: "A2" },
  { text: "They are planning to visit their grandparents next weekend.", translation: "Eles estão planejando visitar seus avós no próximo fim de semana.", level: "A2" },
  { text: "He wants to become a doctor when he grows up.", translation: "Ele quer se tornar médico quando crescer.", level: "A2" },
  { text: "I need to practice my English speaking skills every day.", translation: "Eu preciso praticar minhas habilidades de falar inglês todos os dias.", level: "A2" },
  { text: "The restaurant serves delicious Italian food near the station.", translation: "O restaurante serve comida italiana deliciosa perto da estação.", level: "A2" },
  { text: "We enjoyed watching the movie together last night.", translation: "Nós gostamos de assistir o filme juntos ontem à noite.", level: "A2" },
  
  // B1 - Intermediário
  { text: "Understanding the context of a conversation is more important than knowing every single word.", translation: "Entender o contexto de uma conversa é mais importante do que saber cada palavra individual.", level: "B1" },
  { text: "I have been studying English for three years and I can already hold a conversation.", translation: "Eu tenho estudado inglês por três anos e já consigo manter uma conversa.", level: "B1" },
  { text: "The company is looking for someone who speaks fluent English.", translation: "A empresa está procurando alguém que fale inglês fluente.", level: "B1" },
  { text: "She decided to enroll in an advanced English course to improve her vocabulary.", translation: "Ela decidiu se matricular em um curso avançado de inglês para melhorar seu vocabulário.", level: "B1" },
  { text: "Learning a new language requires patience, dedication, and daily practice.", translation: "Aprender um novo idioma requer paciência, dedicação e prática diária.", level: "B1" },
  
  // B2 - Intermediário+
  { text: "The ability to communicate effectively in English opens many professional opportunities worldwide.", translation: "A habilidade de se comunicar efetivamente em inglês abre muitas oportunidades profissionais no mundo todo.", level: "B2" },
  { text: "Despite the complexity of the grammar rules, she managed to write an excellent essay.", translation: "Apesar da complexidade das regras gramaticais, ela conseguiu escrever uma redação excelente.", level: "B2" },
  { text: "The documentary provided a comprehensive overview of the environmental challenges we face.", translation: "O documentário forneceu uma visão geral abrangente dos desafios ambientais que enfrentamos.", level: "B2" },
  { text: "He acknowledged that improving his pronunciation would require consistent effort over time.", translation: "Ele reconheceu que melhorar sua pronúncia exigiria esforço consistente ao longo do tempo.", level: "B2" },
  
  // C1 - Avançado
  { text: "The juxtaposition of contrasting ideas in the article stimulated profound intellectual discussion.", translation: "A justaposição de ideias contrastantes no artigo estimulou uma discussão intelectual profunda.", level: "C1" },
  { text: "Her sophisticated understanding of cultural nuances allows her to navigate international business negotiations.", translation: "Sua compreensão sofisticada de nuances culturais permite que ela navegue negociações internacionais de negócios.", level: "C1" },
  { text: "The benevolent organization implemented sustainable solutions to address the community's long-term needs.", translation: "A organização benevolente implementou soluções sustentáveis para atender às necessidades de longo prazo da comunidade.", level: "C1" },
  { text: "His comprehensive knowledge of literature encompasses multiple genres and historical periods.", translation: "Seu conhecimento abrangente de literatura abrange múltiplos gêneros e períodos históricos.", level: "C1" },
  
  // C2 - Fluente
  { text: "The ephemeral nature of social media fame underscores the importance of substantial achievements.", translation: "A natureza efêmera da fama nas redes sociais ressalta a importância de conquistas substanciais.", level: "C2" },
  { text: "Through meticulous analysis and unprecedented methodology, the researcher revolutionized the field.", translation: "Através de análise meticulosa e metodologia sem precedentes, o pesquisador revolucionou o campo.", level: "C2" },
  { text: "The quintessential characteristic of profound knowledge is the ability to elucidate complex concepts.", translation: "A característica quintessencial do conhecimento profundo é a habilidade de elucidar conceitos complexos.", level: "C2" },
  { text: "The unprecedented collaboration between the institutions fostered groundbreaking discoveries.", translation: "A colaboração sem precedentes entre as instituições promoveu descobertas inovadoras.", level: "C2" },
]

// Extrai palavras-chave de uma frase ignorando stop words
const stopWords = new Set([
  'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
  'can', 'could', 'should', 'may', 'might', 'shall', 'must',
  'it', 'its', 'this', 'that', 'these', 'those', 'i', 'you',
  'he', 'she', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
  'my', 'your', 'his', 'her', 'our', 'their', 'its', 'not',
  'no', 'nor', 'so', 'if', 'as', 'from', 'by', 'up', 'down',
  'about', 'into', 'through', 'during', 'before', 'after',
  'above', 'below', 'between', 'out', 'off', 'over', 'under',
  'again', 'further', 'then', 'once', 'here', 'there', 'when',
  'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few',
  'more', 'most', 'other', 'some', 'such', 'only', 'own', 'same'
])

function extractWords(text) {
  return [...new Set(
    text.toLowerCase()
      .replace(/[^a-z\s']/g, '')
      .split(/\s+/)
      .filter(w => w.length > 1 && !stopWords.has(w))
  )]
}

async function seed() {
  console.log('Seeding database...')
  let wordsCreated = 0
  let phrasesCreated = 0
  let linksCreated = 0

  for (const p of phrases) {
    // Verifica se frase já existe
    const existing = await prisma.phrase.findUnique({ where: { text: p.text } })
    if (existing) continue

    // Extrai palavras-chave
    const wordTexts = extractWords(p.text)

    // Cria ou encontra palavras
    const wordIds = []
    for (const wt of wordTexts) {
      let word = await prisma.word.findUnique({ where: { word: wt } })
      if (!word) {
        word = await prisma.word.create({
          data: { word: wt, level: p.level }
        })
        wordsCreated++
      }
      wordIds.push(word.id)
    }

    // Cria a frase
    const phrase = await prisma.phrase.create({
      data: {
        text: p.text,
        translation: p.translation,
        level: p.level
      }
    })
    phrasesCreated++

    // Cria as relações N:N
    for (const wid of wordIds) {
      await prisma.phraseWord.create({
        data: { phraseId: phrase.id, wordId: wid }
      })
      linksCreated++
    }

    // Cria SRS record para a frase (vai aparecer para revisão)
    await prisma.sRSRecord.create({
      data: {
        phraseId: phrase.id,
        entityType: 0, // 0 = frase
        status: 'new',
        nextReview: new Date(), // disponível imediatamente
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0
      }
    })
  }

  console.log(`Done! ${phrasesCreated} phrases, ${wordsCreated} words, ${linksCreated} links created.`)
  await prisma.$disconnect()
}

seed().catch(e => {
  console.error(e)
  process.exit(1)
})
