import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const phrases = [
  // A1 - Básico
  { text: "Good morning!", translation: "Oi, bom dia!", level: "A1" },
  { text: "Hello, how are you?", translation: "Oi, tudo bem?", level: "A1" },
  { text: "What time is it?", translation: "Que horas são?", level: "A1" },
  { text: "I need to wake up early tomorrow.", translation: "Preciso acordar cedo amanhã.", level: "A1" },
  { text: "I usually have breakfast at 7am.", translation: "Eu costumo tomar café da manhã às 7h.", level: "A1" },
  { text: "She takes a shower every morning.", translation: "Ela toma banho toda manhã.", level: "A1" },
  { text: "I brush my teeth twice a day.", translation: "Escovo os dentes duas vezes por dia.", level: "A1" },
  { text: "He gets dressed quickly.", translation: "Ele se veste rápido.", level: "A1" },
  { text: "We leave for work at 8am.", translation: "A gente sai para o trabalho às 8h.", level: "A1" },
  { text: "I usually drink coffee in the morning.", translation: "Eu costumo tomar café de manhã.", level: "A1" },
  { text: "She reads the newspaper every day.", translation: "Ela lê o jornal todo dia.", level: "A1" },
  { text: "What did you do today?", translation: "O que você fez hoje?", level: "A1" },
  { text: "I went to the supermarket.", translation: "Fui ao mercado.", level: "A1" },
  { text: "I am hungry.", translation: "Tô com fome.", level: "A1" },
  { text: "I am thirsty.", translation: "Tô com sede.", level: "A1" },
  { text: "I don't feel well.", translation: "Não tô me sentindo bem.", level: "A1" },
  { text: "I have a headache.", translation: "Tô com dor de cabeça.", level: "A1" },
  { text: "Can you help me?", translation: "Você pode me ajudar?", level: "A1" },
  { text: "Thank you very much.", translation: "Muito obrigado(a)!", level: "A1" },
  { text: "Please open the door.", translation: "Pode abrir a porta?", level: "A1" },
  { text: "I'm sorry.", translation: "Desculpa.", level: "A1" },
  { text: "I don't understand.", translation: "Não entendi.", level: "A1" },
  { text: "Do you speak Portuguese?", translation: "Você fala português?", level: "A1" },
  { text: "My name is...", translation: "Meu nome é...", level: "A1" },
  { text: "Nice to meet you.", translation: "Prazer em te conhecer.", level: "A1" },
  { text: "Where are you from?", translation: "De onde você é?", level: "A1" },
  { text: "I am from Brazil.", translation: "Sou do Brasil.", level: "A1" },
  { text: "How much does this cost?", translation: "Quanto custa isso?", level: "A1" },
  { text: "Where is the bathroom?", translation: "Onde fica o banheiro?", level: "A1" },
  { text: "The food is delicious.", translation: "A comida tá deliciosa.", level: "A1" },
  { text: "This is my family.", translation: "Essa é a minha família.", level: "A1" },
  { text: "I am happy.", translation: "Tô feliz.", level: "A1" },
  { text: "I am tired.", translation: "Tô cansado(a).", level: "A1" },
  { text: "Where is the airport?", translation: "Onde fica o aeroporto?", level: "A1" },
  { text: "It is raining.", translation: "Tá chovendo.", level: "A1" },
  { text: "It is hot today.", translation: "Tá calor hoje.", level: "A1" },
  { text: "It is cold today.", translation: "Tá frio hoje.", level: "A1" },
  { text: "What do you do for a living?", translation: "O que você faz?", level: "A1" },
  { text: "I work at a company.", translation: "Trabalho numa empresa.", level: "A1" },
  
  // A2 - Intermediário Básico
  { text: "I usually wake up at 6am.", translation: "Geralmente acordo às 6h.", level: "A2" },
  { text: "She works as a receptionist at the hotel.", translation: "Ela trabalha como recepcionista no hotel.", level: "A2" },
  { text: "They have been living here for five years.", translation: "Eles moram aqui há cinco anos.", level: "A2" },
  { text: "I am going to buy some clothes later.", translation: "Vou comprar algumas roupas mais tarde.", level: "A2" },
  { text: "We should study more for the exam.", translation: "A gente deveria estudar mais pra prova.", level: "A2" },
  { text: "She is looking for a new job.", translation: "Ela tá procurando um emprego novo.", level: "A2" },
  { text: "The book I bought was very interesting.", translation: "O livro que eu comprei foi muito interessante.", level: "A2" },
  { text: "He decided to learn how to cook.", translation: "Ele decidiu aprender a cozinhar.", level: "A2" },
  { text: "I would like to travel to Japan someday.", translation: "Eu gostaria de viajar pro Japão um dia.", level: "A2" },
  { text: "We need to arrive at the airport early.", translation: "A gente precisa chegar no aeroporto cedo.", level: "A2" },
  { text: "I was born in São Paulo in 1995.", translation: "Nasci em São Paulo em 1995.", level: "A2" },
  { text: "The restaurant serves traditional Brazilian food.", translation: "O restaurante serve comida brasileira tradicional.", level: "A2" },
  { text: "She needs to finish her project by Friday.", translation: "Ela precisa terminar o projeto até sexta.", level: "A2" },
  { text: "I think this is the best solution.", translation: "Acho que essa é a melhor solução.", level: "A2" },
  { text: "We are planning to move to a new apartment.", translation: "A gente tá planejando mudar pra um apartamento novo.", level: "A2" },
  { text: "The weather is going to be nice this weekend.", translation: "O tempo vai tá bom nesse fim de semana.", level: "A2" },
  { text: "He is studying engineering at the university.", translation: "Ele tá estudando engenharia na faculdade.", level: "A2" },
  { text: "I have already finished my homework.", translation: "Já terminei minha lição.", level: "A2" },
  { text: "She will visit her parents next month.", translation: "Ela vai visitar os pais mês que vem.", level: "A2" },
  { text: "We should try this new restaurant.", translation: "A gente deveria testar esse restaurante novo.", level: "A2" },
  { text: "The children are playing in the backyard.", translation: "As crianças tão brincando no quintal.", level: "A2" },
  { text: "I understood the lesson very well.", translation: "Entendi a lição muito bem.", level: "A2" },
  
  // B1 - Intermediário
  { text: "I have been working on this project for several months.", translation: "Tô trabalhando nesse projeto há vários meses.", level: "B1" },
  { text: "Understanding the context is more important than knowing every word.", translation: "Entender o contexto é mais importante do que saber cada palavra.", level: "B1" },
  { text: "The ability to communicate effectively is crucial in today's world.", translation: "A capacidade de se comunicar direito é essencial no mundo de hoje.", level: "B1" },
  { text: "We should maintain a balance between work and personal life.", translation: "A gente precisa manter um equilíbrio entre trabalho e vida pessoal.", level: "B1" },
  { text: "The research revealed interesting patterns in consumer behavior.", translation: "A pesquisa mostrou padrões interessantes no comportamento do consumidor.", level: "B1" },
  { text: "I am considering the possibility of pursuing a master's degree abroad.", translation: "Tô pensando na possibilidade de fazer um mestrado fora.", level: "B1" },
  { text: "She demonstrated remarkable talent in solving complex problems.", translation: "Ela mostrou talento enorme em resolver problemas complexos.", level: "B1" },
  { text: "We need to develop critical thinking skills.", translation: "A gente precisa desenvolver pensamento crítico.", level: "B1" },
  { text: "The integration of technology in education has transformed learning.", translation: "A tecnologia na educação mudou a forma de aprender.", level: "B1" },
  { text: "Despite the challenges, we achieved our goals.", translation: "Mesmo com os desafios, a gente alcançou as metas.", level: "B1" },
  { text: "I appreciate the opportunity to learn from experienced professionals.", translation: "Agradeço a oportunidade de aprender com profissionais experientes.", level: "B1" },
  { text: "The weather forecast predicts rain for the weekend.", translation: "A previsão do tempo diz que vai chover no fim de semana.", level: "B1" },
  { text: "She has been studying English for five years.", translation: "Ela tá estudando inglês há cinco anos.", level: "B1" },
  { text: "We should encourage young people to pursue their dreams.", translation: "A gente deveria motivar os jovens a seguir os sonhos.", level: "B1" },
  { text: "I was impressed by the quality of the work.", translation: "Fiquei impressionado com a qualidade do trabalho.", level: "B1" },
  
  // B2 - Intermediário Avançado
  { text: "The ability to communicate effectively in English opens many professional opportunities.", translation: "Saber se comunicar bem em inglês abre muitas portas profissionalmente.", level: "B2" },
  { text: "Despite the complexity of the task, she managed to complete it on time.", translation: "Mesmo sendo complexo, ela conseguiu entregar no prazo.", level: "B2" },
  { text: "The documentary provided a comprehensive overview of environmental challenges.", translation: "O documentary deu uma visão geral completa dos desafios ambientais.", level: "B2" },
  { text: "His extensive knowledge enabled him to provide valuable insights.", translation: "O conhecimento profundo dele permitiu dar insights valiosos.", level: "B2" },
  { text: "The integration of technology has transformed traditional business models.", translation: "A tecnologia mudou os modelos de negócio tradicionais.", level: "B2" },
  { text: "We should create an inclusive environment that celebrates diversity.", translation: "A gente deveria criar um ambiente que celebra a diversidade.", level: "B2" },
  { text: "The collaborative approach led to innovative solutions.", translation: "A abordagem colaborativa gerou soluções inovadoras.", level: "B2" },
  { text: "I was deeply impressed by the team's dedication and professionalism.", translation: "Fiquei muito impressionado com a dedicação e profissionalismo do time.", level: "B2" },
  
  // C1 - Avançado
  { text: "The juxtaposition of contrasting ideas in the article stimulated profound intellectual discussion.", translation: "A presença de ideias opostas no artigo gerou um debate intelectual profundo.", level: "C1" },
  { text: "Her sophisticated understanding of cultural nuances allows her to navigate complex negotiations.", translation: "A compreensão refinada dela sobre nuances culturais permite conduzir negociações complexas.", level: "C1" },
  { text: "The benevolent organization implemented sustainable solutions to address long-term community needs.", translation: "A organização beneficente implementou soluções sustentáveis para atender necessidades de longo prazo da comunidade.", level: "C1" },
  { text: "His comprehensive knowledge of literature encompasses multiple genres and historical periods.", translation: "O conhecimento amplo dele sobre literatura abrange vários gêneros e períodos históricos.", level: "C1" },
  { text: "The ephemeral nature of social media fame underscores the importance of substantive achievements.", translation: "A natureza passageira da fama nas redes sociais mostra a importância de conquistas reais.", level: "C1" },
  
  // C2 - Fluente
  { text: "The paradigm-shifting discoveries revolutionized the field through unprecedented methodology.", translation: "As descobertas que mudaram paradigmas revolucionaram a área com metodologia sem precedentes.", level: "C2" },
  { text: "The integration of advanced machine learning techniques optimizes performance across diverse scenarios.", translation: "A combinação de técnicas avançadas de machine learning otimiza o desempenho em diferentes cenários.", level: "C2" },
  { text: "The comprehensive treatise provided a nuanced analysis of sociopolitical dynamics shaping contemporary society.", translation: "O tratado abrangente apresentou uma análise refinada das dinâmicas sociopolíticas que moldam a sociedade atual.", level: "C2" },
]

const stopWords = new Set([
  'the','a','an','in','on','at','to','for','of','with','and','or','but','is','are','was','were','be','been',
  'have','has','had','do','does','did','will','would','can','could','should','may','might','must','it','its',
  'this','that','these','those','i','you','he','she','we','they','me','him','her','us','them','my','your',
  'his','our','their','not','no','not','so','if','as','from','by','up','down','about','into','through',
  'during','before','after','above','below','between','out','off','over','under','again','further',
  'then','once','here','there','when','where','why','how','all','each','every','both','few','more','most',
  'other','some','such','only','own','same','than','too','very','just','now','get','got','go','went','am'
])

function extractWords(text: string): string[] {
  return [...new Set(
    text.toLowerCase()
      .replace(/[^a-z\s']/g, '')
      .split(/\s+/)
      .filter(w => w.length > 1 && !stopWords.has(w))
  )]
}

export async function POST() {
  let added = 0, skipped = 0, wordsAdded = 0

  for (const p of phrases) {
    const existing = await prisma.phrase.findUnique({ where: { text: p.text } })
    if (existing) { skipped++; continue }

    const wordTexts = extractWords(p.text)
    const wordIds: number[] = []

    for (const wt of wordTexts) {
      let word = await prisma.word.findUnique({ where: { word: wt } })
      if (!word) {
        word = await prisma.word.create({ data: { word: wt, level: p.level } })
        wordsAdded++
      }
      wordIds.push(word.id)
    }

    const phrase = await prisma.phrase.create({
      data: { text: p.text, translation: p.translation, level: p.level }
    })
    added++

    for (const wid of wordIds) {
      await prisma.phraseWord.create({ data: { phraseId: phrase.id, wordId: wid } }).catch(() => {})
    }
  }

  return NextResponse.json({ added, skipped, wordsAdded, total: phrases.length })
}