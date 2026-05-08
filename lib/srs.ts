// SM-2 Algorithm com IntervalosCorretos
// - Again: minutos/horas (mesmo dia)
// - Hard: 1 dia
// - Good: 6+ dias
// - Easy: 10+ dias (expande rapidamente)

export interface ReviewResult {
  easeFactor: number
  interval: number
  repetitions: number
  nextReview: Date
  status: string
  intervalText: string
}

export function processReview(
  rating: number, // 0=Again, 1=Hard, 2=Good, 3=Easy
  currentEaseFactor: number,
  currentInterval: number,
  currentRepetitions: number
): ReviewResult {
  let ef = currentEaseFactor
  let interval = currentInterval
  let reps = currentRepetitions
  let status: string = 'learning'
  let intervalText: string = ''

  // Rating 0 = AGAIN (errei) - revisão em minutos/horas
  if (rating === 0) {
    reps = 0
    
    if (currentInterval === 0) {
      // Primeira vez que errou - 1 minuto
      interval = 0.001 // ~1 minute (as fraction of day)
    } else if (currentInterval < 0.01) {
      // Já está em revisão curta - dobra o tempo
      interval = currentInterval * 2
      if (interval > 0.02) interval = 0.02 // max ~30 minutes
    } else {
      // Intervalo maior, volta para curto
      interval = 0.005 // 5 minutos
    }
    
    ef = Math.max(1.3, ef - 0.2)
    status = 'learning'
    intervalText = interval < 0.01 
      ? `${Math.round(interval * 24 * 60)} min` 
      : `${Math.round(interval * 24)} horas`
  }
  
  // Rating 1 = HARD - revisão em 1 dia
  else if (rating === 1) {
    reps = 0
    interval = 1 // 1 dia
    ef = Math.max(1.3, ef - 0.15)
    status = 'learning'
    intervalText = "1 dia"
  }
  
  // Rating 2 = GOOD - revisão em dias (padrão SM-2)
  else if (rating === 2) {
    reps += 1
    if (reps === 1) interval = 1
    else if (reps === 2) interval = 6
    else interval = Math.round(currentInterval * ef)
    
    ef = Math.max(1.3, ef - 0.08)
    status = interval >= 21 ? 'graduated' : 'review'
    intervalText = interval === 1 ? "1 dia" : 
                   interval < 7 ? `${interval} dias` :
                   interval < 30 ? `${Math.round(interval/7)} semanas` :
                   `${Math.round(interval/30)} meses`
  }
  
  // Rating 3 = EASY - revisão expandida rapidamente
  else if (rating === 3) {
    reps += 1
    if (reps === 1) interval = 4
    else if (reps === 2) interval = 10
    else if (reps === 3) interval = 21
    else interval = Math.round(currentInterval * ef * 1.3) // multiplier maior
    
    ef = ef + 0.15
    status = interval >= 21 ? 'graduated' : 'review'
    intervalText = interval === 1 ? "1 dia" :
                   interval < 7 ? `${interval} dias` :
                   interval < 30 ? `${Math.round(interval/7)} semanas` :
                   `${Math.round(interval/30)} meses`
  }

  const nextReview = new Date()
  if (interval < 1) {
    // Intervalos de menos de 1 dia (minutos)
    nextReview.setMinutes(nextReview.getMinutes() + Math.round(interval * 24 * 60))
  } else {
    nextReview.setDate(nextReview.getDate() + interval)
  }

  return {
    easeFactor: Math.round(ef * 100) / 100,
    interval,
    repetitions: reps,
    nextReview,
    status,
    intervalText
  }
}

export function extractKeyWords(text: string): string[] {
  const stopWords = new Set([
    'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'and', 'or', 'but', 
    'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 
    'will', 'would', 'can', 'could', 'should', 'may', 'might', 'shall', 'must',
    'it', 'its', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'we', 'they',
    'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'our', 'their', 'not',
    'no', 'nor', 'so', 'if', 'as', 'from', 'by', 'up', 'down', 'about', 'into', 'through',
    'during', 'before', 'after', 'above', 'below', 'between', 'out', 'off', 'over', 'under',
    'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how',
    'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such',
    'only', 'own', 'same', 'than', 'too', 'very', 'just', 'now', 'get', 'got', 'go', 'went'
  ])

  return text
    .toLowerCase()
    .replace(/[^a-z\s']/g, '')
    .split(/\s+/)
    .filter(word => word.length > 1 && !stopWords.has(word))
    .filter((word, i, arr) => arr.indexOf(word) === i)
}

export function shouldReleaseWords(phraseStatus: string, phraseRepetitions: number): boolean {
  return phraseStatus === 'graduated' || (phraseStatus === 'review' && phraseRepetitions >= 2)
}