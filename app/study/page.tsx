'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { sounds } from '@/lib/sounds'

interface Card {
  id?: number
  type: 'phrase' | 'word'
  entityId?: number
  text: string
  translation: string
  level?: string
  status?: string
  isNew?: boolean
  imageUrl?: string
}

export default function StudyPage() {
  const router = useRouter()
  const [cards, setCards] = useState<Card[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [loading, setLoading] = useState(true)
  const [studied, setStudied] = useState(0)
  const [lastInterval, setLastInterval] = useState<string>('')
  const [sessionXp, setSessionXp] = useState(0)
  const [showFeedback, setShowFeedback] = useState<{ type: string; xp: number; text: string } | null>(null)

  useEffect(() => { checkAuth() }, [])

  const checkAuth = async () => {
    const res = await fetch('/api/auth/me')
    if (!res.ok) {
      router.push('/login')
      return
    }
    loadCards()
  }

  const loadCards = async () => {
    const res = await fetch('/api/study')
    const data = await res.json()
    const allCards: Card[] = []

    for (const r of data.phrases.due) {
      allCards.push({
        id: r.id, type: 'phrase' as const, entityId: r.phraseId,
        text: r.phrase.text, translation: r.phrase.translation || '',
        level: r.phrase.level, status: r.status,
        imageUrl: r.phrase.imageUrl || undefined
      })
    }

    for (const p of data.phrases.new) {
      allCards.push({
        type: 'phrase' as const, entityId: p.id,
        text: p.text, translation: p.translation || '',
        level: p.level, isNew: true,
        imageUrl: p.imageUrl || undefined
      })
    }

    for (const r of data.words.due) {
      allCards.push({
        id: r.id, type: 'word' as const, entityId: r.wordId,
        text: r.word.word, translation: r.word.translation || '',
        level: r.word.level, status: r.status,
        imageUrl: r.word.imageUrl || undefined
      })
    }

    setCards(allCards)
    setLoading(false)
  }

  const currentCard = cards[currentIndex]
  const totalCards = cards.length

  const handleReview = useCallback(async (rating: number) => {
    if (!currentCard) return

    sounds.flip()

    const body: any = { rating }

    if (currentCard.type === 'word') {
      body.wordId = currentCard.entityId
    } else if (currentCard.id) {
      body.recordId = currentCard.id
    } else if (currentCard.isNew) {
      body.phraseId = currentCard.entityId
    }

    const res = await fetch('/api/study', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()

    if (data.intervalText) setLastInterval(data.intervalText)

    // Calculate XP based on rating
    let xpEarned = 0
    let feedbackType = ''
    let feedbackText = ''

    if (rating === 3) { // Easy
      xpEarned = 20
      feedbackType = 'perfect'
      feedbackText = '🎯 Perfeito! +20 XP'
      sounds.perfect()
    } else if (rating === 2) { // Good
      xpEarned = 12
      feedbackType = 'success'
      feedbackText = '✅ Bom! +12 XP'
      sounds.success()
    } else if (rating === 1) { // Hard
      xpEarned = 5
      feedbackType = 'hard'
      feedbackText = '🤔 Difícil... +5 XP'
      sounds.click()
    } else { // Again
      xpEarned = 2
      feedbackType = 'wrong'
      feedbackText = '💪 Continue! +2 XP'
      sounds.wrong()
    }

    setSessionXp(prev => prev + xpEarned)
    setStudied(s => s + 1)

    setShowFeedback({ type: feedbackType, xp: xpEarned, text: feedbackText })

    setTimeout(() => {
      setShowFeedback(null)
      setLastInterval('')
      goNext()
    }, rating >= 2 ? 800 : 1200)
  }, [currentCard])

  const goNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(i => i + 1)
      setShowAnswer(false)
    } else {
      sounds.achievement()
      router.push('/dashboard')
    }
  }

  const getVisualHint = () => {
    if (!currentCard) return '📚'
    const text = currentCard.text.toLowerCase()
    if (text.includes('weather') || text.includes('sun') || text.includes('rain')) return '☀️'
    if (text.includes('cat') || text.includes('dog') || text.includes('pet')) return '🐾'
    if (text.includes('book') || text.includes('read') || text.includes('study')) return '📚'
    if (text.includes('food') || text.includes('eat') || text.includes('dinner')) return '🍽️'
    if (text.includes('work') || text.includes('job') || text.includes('office')) return '💼'
    if (text.includes('travel') || text.includes('trip') || text.includes('plane')) return '✈️'
    if (text.includes('music') || text.includes('song') || text.includes('dance')) return '🎵'
    if (text.includes('family') || text.includes('friend') || text.includes('love')) return '❤️'
    if (text.includes('home') || text.includes('house') || text.includes('room')) return '🏠'
    if (text.includes('computer') || text.includes('phone') || text.includes('internet')) return '💻'
    return currentCard.type === 'phrase' ? '💬' : '📝'
  }

  if (loading) return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/40">Carregando...</p>
      </div>
    </main>
  )

  if (!currentCard) return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 text-center max-w-sm w-full">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-white mb-2">Sessão Completa!</h2>
        <p className="text-white/50 mb-6">Você estudou todos os cartões de hoje.</p>
        <div className="bg-purple-500/20 rounded-xl p-4 mb-6">
          <div className="text-3xl font-bold text-purple-400">+{sessionXp} XP</div>
          <div className="text-sm text-white/40">ganhados nesta sessão</div>
        </div>
        <button onClick={() => router.push('/dashboard')} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-semibold text-white hover:from-emerald-600 hover:to-teal-700 transition">
          Voltar ao Dashboard
        </button>
      </div>
    </main>
  )

  const progress = totalCards > 0 ? ((studied) / totalCards) * 100 : 0
  const isPhrase = currentCard.type === 'phrase'

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col p-3 sm:p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => { sounds.click(); router.push('/dashboard') }} className="text-white/40 hover:text-white transition text-sm py-2 px-3">
          ← <span className="hidden sm:inline">Voltar</span>
        </button>
        <div className="flex items-center gap-2 sm:gap-4 text-sm">
          <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full">
            ⚡ +{sessionXp} XP
          </span>
          <span className="text-white/40">{studied + 1} / {totalCards}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Feedback Animation */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 text-center"
          >
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
              showFeedback.type === 'perfect' ? 'bg-yellow-500/30 text-yellow-400' :
              showFeedback.type === 'success' ? 'bg-emerald-500/30 text-emerald-400' :
              showFeedback.type === 'hard' ? 'bg-orange-500/30 text-orange-400' :
              'bg-red-500/30 text-red-400'
            }`}>
              {showFeedback.text}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interval Feedback */}
      <AnimatePresence>
        {lastInterval && !showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 text-center"
          >
            <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm">
              ⏰ Próxima revisão: {lastInterval}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-lg"
          >
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 sm:p-10 min-h-[280px] sm:min-h-[320px] flex flex-col justify-center">
              {/* Card Status */}
              <div className="flex justify-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  currentCard.isNew ? 'bg-blue-500/20 text-blue-400' :
                  currentCard.status === 'learning' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {currentCard.isNew ? '✨ nova' : currentCard.status || 'revisão'}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isPhrase ? 'bg-teal-500/20 text-teal-400' : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {isPhrase ? '💬 Frase' : '📝 Palavra'}
                </span>
              </div>

              {!showAnswer ? (
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl mb-4">{getVisualHint()}</div>
                  <p className="text-sm text-white/30 mb-4">
                    {isPhrase ? '🇬🇧 Leia a frase em inglês' : '🇬🇧 Leia a palavra em inglês'}
                  </p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-relaxed mb-6">
                    {currentCard.text}
                  </h2>
                  {currentCard.level && (
                    <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs text-white/40">
                      {currentCard.level}
                    </span>
                  )}
                  <div className="mt-8">
                    <button
                      onClick={() => { sounds.flip(); setShowAnswer(true) }}
                      className="w-full sm:w-auto px-8 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition active:scale-95"
                    >
                      Mostrar Tradução
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl mb-4">{getVisualHint()}</div>
                  <p className="text-sm text-white/30 mb-4">
                    {isPhrase ? '🇧🇷 Tradução em português' : '🇧🇷 Significado em português'}
                  </p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400 leading-relaxed mb-4">
                    {currentCard.translation}
                  </h2>
                  
                  {isPhrase && (
                    <div className="space-y-2 mt-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                      <p className="text-sm text-blue-300">💡 Dica: Não precisa entender cada palavra.</p>
                      <p className="text-sm text-white/50">Foque na <strong className="text-white/70">ideia geral</strong> da frase.</p>
                    </div>
                  )}

                  {!isPhrase && (
                    <div className="space-y-2 mt-4 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                      <p className="text-sm text-purple-300">💡 Esta palavra vem de frases que você já estudou.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Rating Buttons */}
      {showAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-lg mx-auto w-full"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleReview(0)}
            className="py-3 sm:py-4 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl 
                       hover:bg-red-500/30 font-semibold transition-all"
          >
            <div className="text-xl sm:text-2xl mb-1">😓</div>
            <div className="text-xs sm:text-sm">Again</div>
            <div className="text-xs opacity-60 hidden sm:block">1-30 min</div>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleReview(1)}
            className="py-3 sm:py-4 bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-xl 
                       hover:bg-orange-500/30 font-semibold transition-all"
          >
            <div className="text-xl sm:text-2xl mb-1">🤔</div>
            <div className="text-xs sm:text-sm">Hard</div>
            <div className="text-xs opacity-60 hidden sm:block">1 dia</div>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleReview(2)}
            className="py-3 sm:py-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl 
                       hover:bg-emerald-500/30 font-semibold transition-all"
          >
            <div className="text-xl sm:text-2xl mb-1">😊</div>
            <div className="text-xs sm:text-sm">Good</div>
            <div className="text-xs opacity-60 hidden sm:block">6+ dias</div>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleReview(3)}
            className="py-3 sm:py-4 bg-teal-500/20 border border-teal-500/30 text-teal-400 rounded-xl 
                       hover:bg-teal-500/30 font-semibold transition-all"
          >
            <div className="text-xl sm:text-2xl mb-1">🚀</div>
            <div className="text-xs sm:text-sm">Easy</div>
            <div className="text-xs opacity-60 hidden sm:block">10+ dias</div>
          </motion.button>
        </motion.div>
      )}
    </main>
  )
}