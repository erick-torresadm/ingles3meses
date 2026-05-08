const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const phrases = [
  // A1 - 50 frases essenciais
  "Hello, how are you?|Olá, como você está?|A1",
  "My name is John.|Meu nome é John.|A1",
  "I am a student.|Eu sou um estudante.|A1",
  "The book is on the table.|O livro está sobre a mesa.|A1",
  "I live in Brazil.|Eu moro no Brasil.|A1",
  "I like to read.|Eu gosto de ler.|A1",
  "Thank you very much.|Muito obrigado.|A1",
  "Please open the door.|Por favor, abra a porta.|A1",
  "I am hungry.|Eu estou com fome.|A1",
  "Where is the bathroom?|Onde fica o banheiro?|A1",
  "What time is it?|Que horas são?|A1",
  "I am tired.|Eu estou cansado.|A1",
  "She works at a bank.|Ela trabalha em um banco.|A1",
  "I am learning English.|Estou aprendendo inglês.|A1",
  "We are friends.|Nós somos amigos.|A1",
  "I have a dog.|Eu tenho um cachorro.|A1",
  "The weather is nice.|O tempo está bom.|A1",
  "She loves music.|Ela ama música.|A1",
  "I drink coffee.|Eu bebo café.|A1",
  "The sun is bright.|O sol é brilhante.|A1",
  "Can you help me?|Você pode me ajudar?|A1",
  "I want water.|Eu quero água.|A1",
  "It is a nice day.|É um bom dia.|A1",
  "I am happy.|Eu estou feliz.|A1",
  "The cat is sleeping.|O gato está dormindo.|A1",
  "She is beautiful.|Ela é bonita.|A1",
  "I need to go.|Preciso ir.|A1",
  "We eat dinner together.|Nós jantamos juntos.|A1",
  "The house is big.|A casa é grande.|A1",
  "I play soccer.|Eu jogo futebol.|A1",
  "She studies medicine.|Ela estuda medicina.|A1",
  "The car is new.|O carro é novo.|A1",
  "We travel by plane.|Nós viajamos de avião.|A1",
  "I work from home.|Eu trabalho em casa.|A1",
  "The food tastes good.|A comida tem bom gosto.|A1",
  "I love my family.|Eu amo minha família.|A1",
  "He writes books.|Ele escreve livros.|A1",
  "We go to the beach.|Vamos à praia.|A1",
  "I am 25 years old.|Eu tenho 25 anos.|A1",
  "The clock is on the wall.|O relógio está na parede.|A1",
  "She wears a dress.|Ela usa um vestido.|A1",
  "The baby is crying.|O bebê está chorando.|A1",
  "We celebrate Christmas.|Celebramos o Natal.|A1",
  "I ride a bicycle.|Eu vou de bicicleta.|A1",
  "The flower is red.|A flor é vermelha.|A1",
  "She teaches math.|Ela ensina matemática.|A1",
  "I have two sisters.|Eu tenho duas irmãs.|A1",
  "The store opens at 9.|A loja abre às 9h.|A1",
  "We watch movies.|Assistimos filmes.|A1",
  "I am reading a book.|Estou lendo um livro.|A1",
  "The mountain is high.|A montanha é alta.|A1",

  // A2 - 40 frases
  "I usually wake up at 6am.|Eu geralmente acordo às 6h.|A2",
  "She works as a receptionist.|Ela trabalha como recepcionista.|A2",
  "They have been living here for five years.|Eles moram aqui há cinco anos.|A2",
  "I am going to buy some clothes.|Eu vou comprar algumas roupas.|A2",
  "We should study more for the exam.|Devemos estudar mais para a prova.|A2",
  "She is looking for a new job.|Ela está procurando um novo emprego.|A2",
  "The book I bought was interesting.|O livro que comprei foi interessante.|A2",
  "He decided to learn how to cook.|Ele decidiu aprender a cozinhar.|A2",
  "I would like to travel to Japan.|Eu gostaria de viajar para o Japão.|A2",
  "The movie was great.|O filme foi ótimo.|A2",
  "She knows how to speak three languages.|Ela sabe falar três idiomas.|A2",
  "We need to arrive at the airport early.|Precisamos chegar ao aeroporto cedo.|A2",
  "I was born in 1995.|Nasci em 1995.|A2",
  "He has been working here since 2020.|Ele trabalha aqui desde 2020.|A2",
  "The restaurant serves traditional food.|O restaurante serve comida tradicional.|A2",
  "She needs to finish her project by Friday.|Ela precisa terminar seu projeto até sexta.|A2",
  "I think this is the best solution.|Acho que esta é a melhor solução.|A2",
  "We are planning to move to a new apartment.|Estamos planejando mudar para um novo apartamento.|A2",
  "The weather is going to be nice this weekend.|O tempo vai estar bom neste fim de semana.|A2",
  "He is studying engineering at the university.|Ele estuda engenharia na universidade.|A2",
  "I have already finished my homework.|Já terminei minha lição.|A2",
  "She will visit her parents next month.|Ela vai visitar seus pais no próximo mês.|A2",
  "We should try this new restaurant.|Devemos experimentar este novo restaurante.|A2",
  "The children are playing in the backyard.|As crianças estão brincando no quintal.|A2",
  "I understood the lesson very well.|Entendi a lição muito bem.|A2",
  "He became a famous writer.|Ele se tornou um escritor famoso.|A2",
  "She wants to become a doctor.|Ela quer se tornar médica.|A2",
  "We have been waiting for 30 minutes.|Esperamos há 30 minutos.|A2",
  "The cat is sleeping on the chair.|O gato está dormindo na cadeira.|A2",
  "I am interested in learning about cultures.|Estou interessado em aprender sobre culturas.|A2",
  "He always helps his neighbors.|Ele sempre ajuda seus vizinhos.|A2",
  "We prefer spending time outdoors.|Preferimos passar tempo ao ar livre.|A2",
  "The food tastes amazing.|A comida tem um gosto incrível.|A2",
  "She is studying for her driver's license.|Está estudando para a carteira de motorista.|A2",
  "I wish I could speak English fluently.|Wish I could speak English fluently|A2",
  "She decided to start her own business.|Ela decidiu abrir seu próprio negócio.|A2",
  "We are going to celebrate our anniversary.|Vamos celebrar nosso aniversário.|A2",
  "The museum has many ancient artifacts.|O museu tem muitos artefatos antigos.|A2",
  "I recommend you to read this book.|Recomendo você ler este livro.|A2",
  "He has been working on this project for months.|Ele está trabalhando neste projeto há meses.|A2",
  "We should be more careful with our decisions.|Devemos ser mais cuidadosos.|A2",
  "The coffee here is better than at home.|O café aqui é melhor que em casa.|A2",
  "She will be arriving in two hours.|Ela vai chegar em duas horas.|A2",
  "I have been learning English for three years.|Estou aprendendo inglês há três anos.|A2",

  // B1 - 30 frases
  "Understanding the context is more important than knowing every word.|Entender o contexto é mais importante do que saber cada palavra.|B1",
  "She decided to enroll in an advanced English course.|Ela decidiu se matricular em um curso avançado de inglês.|B1",
  "We need to practice our speaking skills every day.|Precisamos praticar nossa fala todos os dias.|B1",
  "The company is looking for someone with experience.|A empresa está procurando alguém com experiência.|B1",
  "I am interested in learning about different cultures.|Estou interessado em aprender sobre diferentes culturas.|B1",
  "We must consider the environmental impact.|Devemos considerar o impacto ambiental.|B1",
  "The documentary provided a comprehensive overview.|O documentário forneceu uma visão geral abrangente.|B1",
  "I would have called you if I had known.|Eu teria te ligado se soubesse.|B1",
  "We should try to maintain work-life balance.|Devemos tentar manter equilíbrio entre trabalho e vida.|B1",
  "The ability to communicate effectively is crucial.|A capacidade de se comunicar é crucial.|B1",
  "We need to develop critical thinking skills.|Precisamos desenvolver habilidades de pensamento crítico.|B1",
  "The research revealed interesting patterns.|A pesquisa revelou padrões interessantes.|B1",
  "I am considering pursuing a master's degree abroad.|Estou considerando fazer um mestrado no exterior.|B1",
  "She demonstrated remarkable talent.|Ela demonstrou talento notável.|B1",
  "We should encourage creativity in the workplace.|Devemos encorajar criatividade no trabalho.|B1",
  "The new technology has revolutionized communication.|A nova tecnologia revolucionou a comunicação.|B1",
  "I was deeply moved by the movie.|Fiquei comovido com o filme.|B1",
  "He managed to overcome many obstacles.|Ele conseguiu superar muitos obstáculos.|B1",
  "We must address the root causes of inequality.|Devemos abordar as causas da desigualdade.|B1",
  "The professor explained the lesson very clearly.|O professor explicou a lição claramente.|B1",
  "I appreciate the opportunity to learn from experts.|Aprecio a oportunidade de aprender com especialistas.|B1",
  "She has contributed significantly to sustainable technologies.|Ela contribuiu significativamente para tecnologias sustentáveis.|B1",
  "We should work together as a team.|Devemos trabalhar juntos como equipe.|B1",
  "Regular exercise improves overall health.|Exercício regular melhora a saúde geral.|B1",
  "I am committed to continuous learning.|Estou comprometido com aprendizagem contínua.|B1",
  "He highlighted the importance of reading regularly.|Ele destacou a importância de ler regularmente.|B1",
  "We should find a balance between development and environment.|Precisamos encontrar equilíbrio entre desenvolvimento e meio ambiente.|B1",
  "The study revealed a strong correlation.|O estudo revelou uma forte correlação.|B1",
  "I was fascinated by the artwork.|Fiquei fascinado pela obra de arte.|B1",
  "She advocated for social justice.|Ela defendeu justiça social.|B1",

  // B2 - 20 frases
  "The ability to communicate effectively opens many opportunities.|A capacidade de se comunicar efetivamente abre muitas oportunidades.|B2",
  "Despite the complexity, she managed to write an excellent essay.|Apesar da complexidade, ela conseguiu escrever uma redação excelente.|B2",
  "The documentary provided a comprehensive overview of environmental challenges.|O documentário forneceu uma visão geral dos desafios ambientais.|B2",
  "The juxtaposition of ideas stimulated profound discussion.|A justaposição de ideias estimulou discussão profunda.|B2",
  "Her sophisticated understanding allows her to navigate negotiations.|Sua compreensão sofisticada permite navegar negociações.|B2",
  "Through meticulous analysis, the researcher revolutionized the field.|Através de análise meticulosa, o pesquisador revolucionou o campo.|B2",
  "The collaboration fostered groundbreaking discoveries.|A colaboração promoveu descobertas inovadoras.|B2",
  "She demonstrated remarkable resilience in overcoming obstacles.|Ela demonstrou resiliência notável em superar obstáculos.|B2",
  "The implementation requires a fundamental shift in mindset.|A implementação requer uma mudança fundamental na mentalidade.|B2",
  "His extensive knowledge provided valuable insights.|Seu amplo conhecimento forneceu insights valiosos.|B2",
  "We should create an inclusive environment.|Devemos criar um ambiente inclusivo.|B2",
  "Technology has transformed traditional approaches.|A tecnologia transformou abordagens tradicionais.|B2",
  "She advocated for evidence-based policies.|Ela defendeu políticas baseadas em evidências.|B2",
  "The problem requires collaborative efforts.|O problema requer esforços colaborativos.|B2",
  "True mastery comes from continuous learning.|A verdadeira mestria vem de aprendizagem contínua.|B2",
  "The findings revealed significant trends.|Os resultados revelaram tendências significativas.|B2",
  "He emphasized the importance of ethical standards.|Ele enfatizou a importância de padrões éticos.|B2",
  "We need to balance growth with sustainability.|Precisamos equilibrar crescimento com sustentabilidade.|B2",
  "The symposium discussed emerging trends.|O simpósio discutiu tendências emergentes.|B2",
  "I was impressed by the innovative solutions.|Fiquei impressionado com as soluções inovadoras.|B2",

  // C1 - 15 frases
  "The benevolent organization implemented sustainable solutions.|A organização benevolente implementou soluções sustentáveis.|C1",
  "His comprehensive knowledge encompasses multiple genres.|Seu conhecimento abrangente abrange múltiplos gêneros.|C1",
  "The ephemeral nature of fame underscores real achievements.|A natureza efêmera da fama sublinha conquistas reais.|C1",
  "The quintessential characteristic is the ability to elucidate complex concepts.|A característica quintessencial é a habilidade de elucidar conceitos complexos.|C1",
  "The unprecedented collaboration fostered groundbreaking discoveries.|A colaboração sem precedentes promoveu descobertas inovadoras.|C1",
  "Her sophisticated understanding of cultural nuances.|Sua compreensão sofisticada de nuances culturais.|C1",
  "Through meticulous analysis and unprecedented methodology.|Através de análise meticulosa e metodologia sem precedentes.|C1",
  "The multifaceted nature requires integrated solutions.|A natureza multifacetada requer soluções integradas.|C1",
  "His seminal work transformed our understanding.|Seu trabalho seminal transformou nossa compreensão.|C1",
  "The comprehensive framework provides holistic understanding.|O framework abrangente fornece compreensão holística.|C1",
  "She demonstrated exceptional diplomatic skills.|Ela demonstrou habilidades diplomáticas excepcionais.|C1",
  "The systematic approach demonstrated rigor and creativity.|A abordagem sistemática demonstrou rigor e criatividade.|C1",
  "His profound commitment has driven transformative changes.|Seu profundo compromisso impulsionou mudanças transformadoras.|C1",
  "The strategic vision positioned it as a leader.|A visão estratégica posicionou como líder.|C1",
  "Her visionary leadership inspired unprecedented collaboration.|Sua liderança visionária inspirou colaboração sem precedentes.|C1",

  // C2 - 10 frases
  "The paradigm-shifting discoveries revolutionized the field.|As descobertas que mudam paradigmas revolucionaram o campo.|C2",
  "The integration of advanced machine learning optimizes performance.|A integração de aprendizado de máquina avançado otimiza o desempenho.|C2",
  "The comprehensive treatise provided a nuanced analysis.|O tratado abrangente forneceu uma análise matizada.|C2",
  "Her exceptional ability to synthesize complex information.|Sua habilidade excepcional de sintetizar informações complexas.|C2",
  "The interdisciplinary approach requires unprecedented collaboration.|A abordagem interdisciplinar requer colaboração sem precedentes.|C2",
  "His profound understanding of global market dynamics.|Sua compreensão profunda da dinâmica global do mercado.|C2",
  "The innovative solution addresses systemic barriers.|A solução inovadora aborda barreiras sistêmicas.|C2",
  "His distinguished career exemplifies the integration of theory and practice.|Sua carreira distinta exemplifica a integração de teoria e prática.|C2",
  "The comprehensive review synthesized findings to provide understanding.|A revisão abrangente sintetizou resultados para fornecer compreensão.|C2",
  "Her seminal contributions established new paradigms.|Suas contribuições seminais estabeleceram novos paradigmas.|C2",
]

const stopWords = new Set(['the','a','an','in','on','at','to','for','of','with','and','or','but','is','are','was','were','be','been','have','has','had','do','does','did','will','would','can','could','should','may','might','must','it','its','this','that','these','those','i','you','he','she','we','they','me','him','her','us','them','my','your','his','our','their','not','no','nor','so','if','as','from','by','up','down','about','into','through','during','before','after','above','below','between','out','off','over','under','again','further','then','once','here','there','when','where','why','how','all','each','every','both','few','more','most','other','some','such','only','own','same','than','too','very','just','now','get','got','go','went'])

function extractWords(text) {
  return [...new Set(text.toLowerCase().replace(/[^a-z\s']/g,'').split(/\s+/).filter(w => w.length>1 && !stopWords.has(w)))]
}

async function seed() {
  let added=0, skipped=0
  for (const line of phrases) {
    const [text,translation,level] = line.split('|')
    const existing = await prisma.phrase.findUnique({where:{text}})
    if (existing) { skipped++; continue }

    const wordTexts = extractWords(text)
    const wordIds = []
    for (const wt of wordTexts) {
      let word = await prisma.word.findUnique({where:{word:wt}})
      if (!word) word = await prisma.word.create({data:{word:wt,level}})
      wordIds.push(word.id)
    }

    const phrase = await prisma.phrase.create({data:{text,translation,level}})
    for (const wid of wordIds) await prisma.phraseWord.create({data:{phraseId:phrase.id,wordId:wid}}).catch(()=>{})
    await prisma.sRSRecord.create({data:{phraseId:phrase.id,entityType:0,status:'new',nextReview:new Date(Date.now()+Math.random()*86400000),easeFactor:2.5,interval:0,repetitions:0}})
    added++
  }
  const phrasesCount = await prisma.phrase.count()
  const wordsCount = await prisma.word.count()
  console.log(`Feito! ${added} frases adicionadas, ${skipped} ignoradas. Total: ${phrasesCount} frases, ${wordsCount} palavras.`)
  await prisma.$disconnect()
}
seed()