const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Traduções naturais e contextualizadas em português brasileiro
const phrasesData = [
  // ============================================
  // A1 - BÁSICO - Frases do cotidiano real
  // ============================================
  { level: "A1", text: "Good morning!", translation: "Oi, bom dia!" },
  { level: "A1", text: "Hello, how are you?", translation: "Oi, tudo bem?" },
  { level: "A1", text: "What time is it?", translation: "Que horas são?" },
  { level: "A1", text: "I need to wake up early tomorrow.", translation: "Preciso acordar cedo amanhã." },
  { level: "A1", text: "I usually have breakfast at 7am.", translation: "Eu costumo tomar café da manhã às 7h." },
  { level: "A1", text: "She takes a shower every morning.", translation: "Ela toma banho toda manhã." },
  { level: "A1", text: "I brush my teeth twice a day.", translation: "Escovo os dentes duas vezes por dia." },
  { level: "A1", text: "He gets dressed quickly.", translation: "Ele se veste rápido." },
  { level: "A1", text: "We leave for work at 8am.", translation: "A gente sai para o trabalho às 8h." },
  { level: "A1", text: "I usually drink coffee in the morning.", translation: "Eu costumo tomar café de manhã." },
  { level: "A1", text: "She reads the newspaper every day.", translation: "Ela lê o jornal todo dia." },
  { level: "A1", text: "I check my phone first thing in the morning.", translation: "A primeira coisa que faço de manhã é olhar o celular." },
  { level: "A1", text: "What is your daily routine?", translation: "Qual é a sua rotina do dia?" },
  { level: "A1", text: "I usually go to bed at 10pm.", translation: "Eu costumo dormir às 22h." },
  { level: "A1", text: "I need to set my alarm.", translation: "Preciso colocar o alarme." },
  { level: "A1", text: "She makes her bed every morning.", translation: "Ela arruma a cama toda manhã." },
  { level: "A1", text: "Do you have a pet?", translation: "Você tem bichinho de estimação?" },
  { level: "A1", text: "I feed my cat twice a day.", translation: "Dou comida pro meu gato duas vezes por dia." },
  { level: "A1", text: "We walk the dog in the park.", translation: "A gente passeia com o cachorro no parque." },
  { level: "A1", text: "I water the plants every morning.", translation: "Rego as plantas todo dia de manhã." },
  { level: "A1", text: "She buys groceries once a week.", translation: "Ela faz compras no mercado uma vez por semana." },
  { level: "A1", text: "I cook dinner for my family.", translation: "Eu cozinho o jantar pra minha família." },
  { level: "A1", text: "We eat dinner together at 7pm.", translation: "A gente janta junto às 19h." },
  { level: "A1", text: "I wash the dishes after meals.", translation: "Lavo a louça depois de comer." },
  { level: "A1", text: "She tidies up the house on Saturdays.", translation: "Ela limpa a casa aos sábados." },
  { level: "A1", text: "I do laundry on weekends.", translation: "Lavo roupa nos fins de semana." },
  { level: "A1", text: "He watches TV in the evening.", translation: "Ele assiste TV à noite." },
  { level: "A1", text: "I listen to music before bed.", translation: "Escuto música antes de dormir." },
  { level: "A1", text: "She reads a book before sleeping.", translation: "Ela lê um livro antes de dormir." },
  { level: "A1", text: "What did you do today?", translation: "O que você fez hoje?" },
  { level: "A1", text: "I went to the supermarket.", translation: "Fui ao mercado." },
  { level: "A1", text: "She picked up her kids from school.", translation: "Ela buscou as crianças na escola." },
  { level: "A1", text: "I stopped by the pharmacy.", translation: "Passei na farmácia." },
  { level: "A1", text: "We met our friends for coffee.", translation: "A gente tomou um café com os amigos." },
  { level: "A1", text: "I worked from home today.", translation: "Trabalhei de casa hoje." },
  { level: "A1", text: "She attended a meeting this morning.", translation: "Ela participou de uma reunião de manhã." },
  { level: "A1", text: "I had lunch with my colleagues.", translation: "Almocei com os colegas." },
  { level: "A1", text: "We went for a walk after dinner.", translation: "A gente saiu pra caminar depois do jantar." },
  { level: "A1", text: "I called my parents tonight.", translation: "Liguei pra minha família hoje à noite." },
  { level: "A1", text: "She texted her friend.", translation: "Ela mandou mensagem pra amiga." },
  { level: "A1", text: "I checked my email.", translation: "Verifiquei os emails." },
  { level: "A1", text: "We planned our weekend.", translation: "A gente planejou o fim de semana." },
  { level: "A1", text: "I made a to-do list for tomorrow.", translation: "Fiz uma lista do que preciso fazer amanhã." },
  { level: "A1", text: "She took a nap this afternoon.", translation: "Ela dormiu uma sesta à tarde." },
  { level: "A1", text: "I stretched before going to bed.", translation: "Alonguei antes de dormir." },
  { level: "A1", text: "We said goodnight to each other.", translation: "A gente se desejou boa noite." },
  { level: "A1", text: "I am hungry.", translation: "Tô com fome." },
  { level: "A1", text: "I am thirsty.", translation: "Tô com sede." },
  { level: "A1", text: "I don't feel well.", translation: "Não tô me sentindo bem." },
  { level: "A1", text: "I have a headache.", translation: "Tô com dor de cabeça." },
  { level: "A1", text: "I need to see a doctor.", translation: "Preciso ir ao médico." },
  { level: "A1", text: "Where is the hospital?", translation: "Onde fica o hospital?" },
  { level: "A1", text: "Can you help me?", translation: "Você pode me ajudar?" },
  { level: "A1", text: "Thank you very much.", translation: "Muito obrigado(a)!" },
  { level: "A1", text: "Please open the door.", translation: "Pode abrir a porta?" },
  { level: "A1", text: "I'm sorry.", translation: "Desculpa." },
  { level: "A1", text: "Excuse me.", translation: "Com licença." },
  { level: "A1", text: "I don't understand.", translation: "Não entendi." },
  { level: "A1", text: "Do you speak Portuguese?", translation: "Você fala português?" },
  { level: "A1", text: "I speak a little English.", translation: "Falo um pouco de inglês." },
  { level: "A1", text: "My name is...", translation: "Meu nome é..." },
  { level: "A1", text: "Nice to meet you.", translation: "Prazer em te conhecer." },
  { level: "A1", text: "Where are you from?", translation: "De onde você é?" },
  { level: "A1", text: "I am from Brazil.", translation: "Sou do Brasil." },
  { level: "A1", text: "How much does this cost?", translation: "Quanto custa isso?" },
  { level: "A1", text: "I would like to buy this.", translation: "Queria comprar isso." },
  { level: "A1", text: "Do you have this in another size?", translation: "Tem esse em outro tamanho?" },
  { level: "A1", text: "Where is the bathroom?", translation: "Onde fica o banheiro?" },
  { level: "A1", text: "The food is delicious.", translation: "A comida tá deliciosa." },
  { level: "A1", text: "Can I have the menu please?", translation: "Posso ver o cardápio?" },
  { level: "A1", text: "I am ready to order.", translation: "Já posso pedir." },
  { level: "A1", text: "Can I have the bill please?", translation: "A conta, por favor." },
  { level: "A1", text: "This is my family.", translation: "Essa é a minha família." },
  { level: "A1", text: "I have two siblings.", translation: "Tenho dois irmãos." },
  { level: "A1", text: "My mother is a doctor.", translation: "Minha mãe é médica." },
  { level: "A1", text: "My father works in finance.", translation: "Meu pai trabalha com finanças." },
  { level: "A1", text: "I am married.", translation: "Sou casada(o)." },
  { level: "A1", text: "My wife is a teacher.", translation: "Minha esposa é professora." },
  { level: "A1", text: "We have three children.", translation: "Temos três filhos." },
  { level: "A1", text: "My son is in college.", translation: "Meu filho tá na faculdade." },
  { level: "A1", text: "My daughter is in high school.", translation: "Minha filha tá no ensino médio." },
  { level: "A1", text: "I visit my grandparents on Sundays.", translation: "Visito meus avós aos domingos." },
  { level: "A1", text: "I am happy.", translation: "Tô feliz." },
  { level: "A1", text: "I am sad.", translation: "Tô triste." },
  { level: "A1", text: "I am excited.", translation: "Tô animado(a)." },
  { level: "A1", text: "I am tired.", translation: "Tô cansado(a)." },
  { level: "A1", text: "I am angry.", translation: "Tô bravo(a)." },
  { level: "A1", text: "I am scared.", translation: "Tô com medo." },
  { level: "A1", text: "I am surprised.", translation: "Fiquei surpreso(a)." },
  { level: "A1", text: "I am worried.", translation: "Tô preocupado(a)." },
  { level: "A1", text: "I feel lonely.", translation: "Me sinto sozinho(a)." },
  { level: "A1", text: "I am in love.", translation: "Tô apaixonado(a)." },
  { level: "A1", text: "I am stressed out.", translation: "Tô estressado(a)." },
  { level: "A1", text: "Where is the airport?", translation: "Onde fica o aeroporto?" },
  { level: "A1", text: "I need a passport.", translation: "Preciso do passaporte." },
  { level: "A1", text: "I am traveling to Brazil.", translation: "Vou viajar pro Brasil." },
  { level: "A1", text: "I booked a flight.", translation: "Comprei uma passagem." },
  { level: "A1", text: "How much is the ticket?", translation: "Quanto custa a passagem?" },
  { level: "A1", text: "We are going on vacation.", translation: "A gente vai de férias." },
  { level: "A1", text: "I am staying at a hotel.", translation: "Vou ficar num hotel." },
  { level: "A1", text: "Do you have a room available?", translation: "Tem quarto disponível?" },
  { level: "A1", text: "I want to check in.", translation: "Quero fazer o check-in." },
  { level: "A1", text: "When does the bus leave?", translation: "A que horas o ônibus sai?" },
  { level: "A1", text: "The weather is nice today.", translation: "O tempo tá bom hoje." },
  { level: "A1", text: "It is raining.", translation: "Tá chovendo." },
  { level: "A1", text: "It is hot today.", translation: "Tá calor hoje." },
  { level: "A1", text: "It is cold today.", translation: "Tá frio hoje." },
  { level: "A1", text: "I work at a company.", translation: "Trabalho numa empresa." },
  { level: "A1", text: "What do you do for a living?", translation: "O que você faz?" },
  { level: "A1", text: "I am a teacher.", translation: "Sou professor(a)." },
  { level: "A1", text: "She works in marketing.", translation: "Ela trabalha com marketing." },
  { level: "A1", text: "I have a meeting at 2pm.", translation: "Tenho reunião às 14h." },
  { level: "A1", text: "I need to send an email.", translation: "Preciso enviar um email." },
  { level: "A1", text: "Can you help me with this task?", translation: "Você pode me ajudar com isso?" },
  { level: "A1", text: "I finished my project.", translation: "Terminei meu projeto." },
  { level: "A1", text: "The deadline is next week.", translation: "O prazo é semana que vem." },
  { level: "A1", text: "I work from home on Fridays.", translation: "Trabalho de casa nas sextas." },
  
  // ============================================
  // A2 - INTERMEDIÁRIO BÁSICO
  // ============================================
  { level: "A2", text: "I usually wake up at 6am.", translation: "Geralmente acordo às 6h." },
  { level: "A2", text: "She works as a receptionist at the hotel.", translation: "Ela trabalha como recepcionista no hotel." },
  { level: "A2", text: "They have been living here for five years.", translation: "Eles moram aqui há cinco anos." },
  { level: "A2", text: "I am going to buy some clothes later.", translation: "Vou comprar algumas roupas mais tarde." },
  { level: "A2", text: "We should study more for the exam.", translation: "A gente deveria estudar mais pra prova." },
  { level: "A2", text: "She is looking for a new job.", translation: "Ela tá procurando um emprego novo." },
  { level: "A2", text: "The book I bought was very interesting.", translation: "O livro que eu comprei foi muito interessante." },
  { level: "A2", text: "He decided to learn how to cook.", translation: "Ele decidiu aprender a cozinhar." },
  { level: "A2", text: "I would like to travel to Japan someday.", translation: "Eu gostaria de viajar pro Japão um dia." },
  { level: "A2", text: "The movie we watched last night was great.", translation: "O filme que a gente assistiu ontem à noite foi legal." },
  { level: "A2", text: "She knows how to speak three languages.", translation: "Ela sabe falar três idiomas." },
  { level: "A2", text: "We need to arrive at the airport early.", translation: "A gente precisa chegar no aeroporto cedo." },
  { level: "A2", text: "I was born in São Paulo in 1995.", translation: "Nasci em São Paulo em 1995." },
  { level: "A2", text: "He has been working here since 2020.", translation: "Ele trabalha aqui desde 2020." },
  { level: "A2", text: "The restaurant serves traditional Brazilian food.", translation: "O restaurante serve comida brasileira tradicional." },
  { level: "A2", text: "She needs to finish her project by Friday.", translation: "Ela precisa terminar o projeto até sexta." },
  { level: "A2", text: "I think this is the best solution.", translation: "Acho que essa é a melhor solução." },
  { level: "A2", text: "We are planning to move to a new apartment.", translation: "A gente tá planejando mudar pra um apartamento novo." },
  { level: "A2", text: "The weather is going to be nice this weekend.", translation: "O tempo vai tá bom nesse fim de semana." },
  { level: "A2", text: "He is studying engineering at the university.", translation: "Ele tá estudando engenharia na faculdade." },
  { level: "A2", text: "I have already finished my homework.", translation: "Já terminei minha lição." },
  { level: "A2", text: "She will visit her parents next month.", translation: "Ela vai visitar os pais mês que vem." },
  { level: "A2", text: "We should try this new restaurant.", translation: "A gente deveria testar esse restaurante novo." },
  { level: "A2", text: "The children are playing in the backyard.", translation: "As crianças tão brincando no quintal." },
  { level: "A2", text: "I understood the lesson very well.", translation: "Entendi a lição muito bem." },
  { level: "A2", text: "He became a famous writer after his first book.", translation: "Ele ficou escritor famoso depois do primeiro livro." },
  { level: "A2", text: "She wants to become a doctor in the future.", translation: "Ela quer ser médica no futuro." },
  { level: "A2", text: "We have been waiting for the bus for 30 minutes.", translation: "A gente tá esperando o ônibus há 30 minutos." },
  { level: "A2", text: "The cat is sleeping on the comfortable chair.", translation: "O gato tá dormindo na cadeira confortável." },
  { level: "A2", text: "I am interested in learning about different cultures.", translation: "Tô interessado em aprender sobre culturas diferentes." },
  { level: "A2", text: "He always helps his neighbors on weekends.", translation: "Ele sempre ajuda os vizinhos nos fins de semana." },
  { level: "A2", text: "We prefer spending time outdoors rather than indoors.", translation: "A gente prefere passar tempo ao ar livre do que em casa." },
  { level: "A2", text: "The food in this restaurant tastes amazing.", translation: "A comida nesse restaurante égoste incredible." },
  { level: "A2", text: "She is studying for her driver's license exam.", translation: "Tá estudando pra prova da carteira de motorista." },
  { level: "A2", text: "We usually have lunch at noon.", translation: "Geralmente almoçamos ao meio-dia." },
  { level: "A2", text: "The book about history was very informative.", translation: "O livro de história foi muito informativo." },
  { level: "A2", text: "He is practicing the piano every day to improve.", translation: "Ele tá praticando piano todo dia pra melhorar." },
  { level: "A2", text: "We have a lot of work to do this week.", translation: "A gente tem muito trabalho pra fazer essa semana." },
  { level: "A2", text: "The new shopping mall opened last month.", translation: "O shopping novo abriu mês passado." },
  { level: "A2", text: "She is talented at playing the violin.", translation: "Ela tem talento pra tocar violino." },
  { level: "A2", text: "We should protect the environment for future generations.", translation: "A gente deveria proteger o meio ambiente pros netos." },
  { level: "A2", text: "The weather forecast predicts rain for tomorrow.", translation: "A previsão do tempo prevê chuva pra amanhã." },
  { level: "A2", text: "He has been studying medicine for six years.", translation: "Ele tá estudando medicina há seis anos." },
  { level: "A2", text: "I am considering changing my career.", translation: "Tô pensando em mudar de carreira." },
  { level: "A2", text: "We have an important meeting scheduled for Monday.", translation: "A gente tem uma reunião importante marcada pra segunda." },
  
  // ============================================
  // B1 - INTERMEDIÁRIO
  // ============================================
  { level: "B1", text: "I have been working on this project for several months.", translation: "Tô trabalhando nesse projeto há vários meses." },
  { level: "B1", text: "Understanding the context is more important than knowing every word.", translation: "Entender o contexto é mais importante do que saber cada palavra." },
  { level: "B1", text: "The ability to communicate effectively is crucial in today's world.", translation: "A capacidade de se comunicar direito é essencial no mundo de hoje." },
  { level: "B1", text: "I would have called you if I had known you were waiting.", translation: "Eu teria te ligado se soubesse que você tava esperando." },
  { level: "B1", text: "We should maintain a balance between work and personal life.", translation: "A gente precisa manter um equilíbrio entre trabalho e vida pessoal." },
  { level: "B1", text: "The research revealed interesting patterns in consumer behavior.", translation: "A pesquisa mostrou padrões interessantes no comportamento do consumidor." },
  { level: "B1", text: "I am considering the possibility of pursuing a master's degree abroad.", translation: "Tô pensando na possibilidade de fazer um mestrado fora." },
  { level: "B1", text: "She demonstrated remarkable talent in solving complex problems.", translation: "Ela mostrou talento remarkable em resolver problemas complexos." },
  { level: "B1", text: "We need to develop critical thinking skills.", translation: "A gente precisa desenvolver pensamento crítico." },
  { level: "B1", text: "The integration of technology in education has transformed learning.", translation: "A tecnologia na educação mudou a forma de aprender." },
  { level: "B1", text: "Despite the challenges, we achieved our goals.", translation: "Mesmo com os desafios, a gente alcançou as metas." },
  { level: "B1", text: "I appreciate the opportunity to learn from experienced professionals.", translation: "Agradeço a oportunidade de aprender com profissionais experientes." },
  { level: "B1", text: "The weather forecast predicts rain for the weekend.", translation: "A previsão do tempo diz que vai chover no fim de semana." },
  { level: "B1", text: "She has been studying English for five years.", translation: "Ela tá estudando inglês há cinco anos." },
  { level: "B1", text: "We should encourage young people to pursue their dreams.", translation: "A gente deveria motivar os jovens a seguir os sonhos." },
  { level: "B1", text: "The documentary covered important social issues.", translation: "O documentário abordou questões sociais importantes." },
  { level: "B1", text: "I was impressed by the quality of the work.", translation: "Fiquei impressionado com a qualidade do trabalho." },
  { level: "B1", text: "We need to find a solution before it's too late.", translation: "A gente precisa encontrar uma solução antes que seja tarde demais." },
  { level: "B1", text: "The new policy will take effect next month.", translation: "A nova política vai entrar em vigor mês que vem." },
  { level: "B1", text: "I am committed to continuous improvement.", translation: "Tô comprometido com melhoria constante." },
  { level: "B1", text: "The evidence suggests that regular exercise improves health.", translation: "As evidências mostram que exercício regular melhora a saúde." },
  { level: "B1", text: "We should protect the environment for future generations.", translation: "A gente deveria proteger o meio ambiente pros futuros gerações." },
  { level: "B1", text: "The conference brought together experts from around the world.", translation: "O conferência reuniu especialistas de todo o mundo." },
  { level: "B1", text: "I am grateful for all the support I have received.", translation: "Sou grato por todo o apoio que recebi." },
  { level: "B1", text: "The team worked together to solve the problem.", translation: "A equipe trabalhou junta pra resolver o problema." },
  { level: "B1", text: "She decided to change her career path.", translation: "Ela decidiu mudar o caminho da carreira." },
  { level: "B1", text: "We need to adapt to the changing circumstances.", translation: "A gente precisa se adaptar às circunstâncias que mudam." },
  { level: "B1", text: "The experience taught me valuable lessons.", translation: "A experiência me ensinou lições valiosas." },
  { level: "B1", text: "I recommend this book to anyone interested in the topic.", translation: "Recomendo esse livro pra quem tá interessado no assunto." },

  // ============================================
  // B2 - INTERMEDIÁRIO AVANÇADO
  // ============================================
  { level: "B2", text: "The ability to communicate effectively in English opens many professional opportunities.", translation: "Saber se comunicar bem em inglês abre muitas portas profissionalmente." },
  { level: "B2", text: "Despite the complexity of the task, she managed to complete it on time.", translation: "Mesmo sendo complexo, ela conseguiu entregar no prazo." },
  { level: "B2", text: "The documentary provided a comprehensive overview of environmental challenges.", translation: "O documentário deu uma visão geral completa dos desafios ambientais." },
  { level: "B2", text: "His extensive knowledge enabled him to provide valuable insights.", translation: "O conhecimento profundo dele permitiu dar insights valiosos." },
  { level: "B2", text: "The integration of technology has transformed traditional business models.", translation: "A tecnologia mudou os modelos de negócio tradicionais." },
  { level: "B2", text: "We should create an inclusive environment that celebrates diversity.", translation: "A gente deveria criar um ambiente que celebra a diversidade." },
  { level: "B2", text: "The collaborative approach led to innovative solutions.", translation: "A abordagem colaborativa gerou soluções inovadoras." },
  { level: "B2", text: "I was deeply impressed by the team's dedication and professionalism.", translation: "Fiquei muito impressionado com a dedicação e profissionalismo do time." },
  { level: "B2", text: "The implementation of sustainable practices requires a fundamental shift in mindset.", translation: "Praticar sustentabilidade exige mudança de mentalidade." },
  { level: "B2", text: "Her strategic vision has positioned the company as a leader in the industry.", translation: "A visão estratégica dela posicionou a empresa como líder do setor." },
  { level: "B2", text: "We should maintain transparency in our decision-making process.", translation: "A gente precisa ser transparente no processo de decisão." },
  { level: "B2", text: "I am confident that we will achieve our targets this year.", translation: "Tô confiante que vamos atingir as metas esse ano." },

  // ============================================
  // C1 - AVANÇADO
  // ============================================
  { level: "C1", text: "The juxtaposition of contrasting ideas in the article stimulated profound intellectual discussion.", translation: "A presença de ideias opostas no artigo gerou um debate intelectual profundo." },
  { level: "C1", text: "Her sophisticated understanding of cultural nuances allows her to navigate complex negotiations.", translation: "A compreensão refinada dela sobre nuances culturais permite conduzir negociações complexas." },
  { level: "C1", text: "The benevolent organization implemented sustainable solutions to address long-term community needs.", translation: "A organização beneficente implementou soluções sustentáveis para atender necessidades de longo prazo da comunidade." },
  { level: "C1", text: "His comprehensive knowledge of literature encompasses multiple genres and historical periods.", translation: "O conhecimento amplo dele sobre literatura abrange vários gêneros e períodos históricos." },
  { level: "C1", text: "The ephemeral nature of social media fame underscores the importance of substantive achievements.", translation: "A natureza passageira da fama nas redes sociais mostra a importância de conquistas reais." },
  { level: "C1", text: "Through meticulous analysis and unprecedented methodology, the researcher revolutionized the field.", translation: "Com análise rigorosa e metodologia nova, o pesquisador revolucionou a área." },

  // ============================================
  // C2 - FLUENTE
  // ============================================
  { level: "C2", text: "The paradigm-shifting discoveries revolutionized the field through unprecedented methodology.", translation: "As descobertas que mudaram paradigmas revolucionaram a área com metodologia sem precedentes." },
  { level: "C2", text: "The integration of advanced machine learning techniques optimizes performance across diverse scenarios.", translation: "A combinação de técnicas avançadas de machine learning otimiza o desempenho em diferentes cenários." },
  { level: "C2", text: "The comprehensive treatise provided a nuanced analysis of sociopolitical dynamics shaping contemporary society.", translation: "O tratado abrangente apresentou uma análise refinada das dinâmicas sociopolíticas que moldam a sociedade atual." },
]

const stopWords = new Set([
  'the','a','an','in','on','at','to','for','of','with','and','or','but','is','are','was','were','be','been',
  'have','has','had','do','does','did','will','would','can','could','should','may','might','must','it','its',
  'this','that','these','those','i','you','he','she','we','they','me','him','her','us','them','my','your',
  'his','our','their','not','no','nor','so','if','as','from','by','up','down','about','into','through','during',
  'before','after','above','below','between','out','off','over','under','again','further','then','once','here',
  'there','when','where','why','how','all','each','every','both','few','more','most','other','some','such',
  'only','own','same','than','too','very','just','now','get','got','go','went','am','being'
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
  console.log('🌱 Fazendo seed com traduções naturais...\n')
  
  let phrasesAdded = 0
  let wordsCreated = 0
  let linksCreated = 0

  for (const p of phrasesData) {
    const existing = await prisma.phrase.findUnique({ where: { text: p.text } })
    if (existing) continue

    const wordTexts = extractWords(p.text)
    const wordIds = []

    for (const wt of wordTexts) {
      let word = await prisma.word.findUnique({ where: { word: wt } })
      if (!word) {
        word = await prisma.word.create({ data: { word: wt, level: p.level } })
        wordsCreated++
      }
      wordIds.push(word.id)
    }

    const phrase = await prisma.phrase.create({
      data: { text: p.text, translation: p.translation, level: p.level }
    })
    phrasesAdded++

    for (const wid of wordIds) {
      try {
        await prisma.phraseWord.create({ data: { phraseId: phrase.id, wordId: wid } })
        linksCreated++
      } catch {}
    }

    await prisma.sRSRecord.create({
      data: {
        phraseId: phrase.id,
        entityType: 0,
        status: 'new',
        nextReview: new Date(Date.now() + Math.random() * 86400000 * 2),
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0
      }
    })
  }

  const phrases = await prisma.phrase.count()
  const words = await prisma.word.count()
  
  console.log('✅ Seed completo!')
  console.log(`   ${phrases} frases`)
  console.log(`   ${words} palavras`)
  console.log(`   ${linksCreated} conexões`)
  
  await prisma.$disconnect()
}

seed().catch(console.error)