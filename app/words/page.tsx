'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Word {
  id: number
  word: string
  translation?: string
  level: string
  partOfSpeech?: string
  phonetics?: string
  phrases: { phrase: { text: string; translation?: string; level: string } }[]
  srsRecords: any[]
}

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('/api/words').then(r => r.json()).then(data => {
      setWords(data)
      setLoading(false)
    })
  }, [])

  const filtered = words.filter(w => {
    if (filter === 'all') return true
    if (filter === 'available') return w.srsRecords.some(r => r.status === 'available' || r.status === 'learning' || r.status === 'review')
    if (filter === 'locked') return w.srsRecords.length === 0
    if (filter === 'graduated') return w.srsRecords.some(r => r.status === 'graduated')
    return true
  })

  const levelBadge = (level: string) => {
    const colors: Record<string, string> = {
      A1: 'bg-green-500/20 text-green-400',
      A2: 'bg-teal-500/20 text-teal-400',
      B1: 'bg-blue-500/20 text-blue-400',
      B2: 'bg-indigo-500/20 text-indigo-400',
      C1: 'bg-purple-500/20 text-purple-400',
      C2: 'bg-pink-500/20 text-pink-400'
    }
    return colors[level] || 'bg-white/10 text-white/40'
  }

  const statusBadge = (word: Word) => {
    const srs = word.srsRecords[0]
    if (!srs) return <span className="px-2 py-0.5 bg-white/10 text-white/30 rounded text-xs">🔒 bloqueada</span>
    if (srs.status === 'available') return <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">🆕 disponível</span>
    if (srs.status === 'learning') return <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded text-xs">📖 aprendendo</span>
    if (srs.status === 'review') return <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs">🔄 revisão</span>
    if (srs.status === 'graduated') return <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">✅ dominada</span>
    return null
  }

  const counts = {
    total: words.length,
    available: words.filter(w => w.srsRecords.some(r => ['available','learning','review'].includes(r.status))).length,
    locked: words.filter(w => w.srsRecords.length === 0).length,
    graduated: words.filter(w => w.srsRecords.some(r => r.status === 'graduated')).length
  }

  return (
    <main className="min-h-screen bg-[#0f172a] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-teal-600/5 to-cyan-600/5" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <nav className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center font-bold text-white text-sm">
              FS
            </div>
            <span className="text-xl font-bold text-white">FluentSRS</span>
          </Link>
          <Link href="/import" className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white/70 hover:bg-white/20 transition text-sm">
            + Importar
          </Link>
        </nav>

        <h1 className="text-3xl font-bold text-white mb-2">Vocabulário</h1>
        <p className="text-white/40 mb-8">
          {words.length} palavras extraídas de {new Set(words.flatMap(w => w.phrases.map(p => p.phrase.level))).size} níveis
        </p>

        {/* Mini Stats */}
        <div className="flex gap-4 mb-6 text-sm">
          <span className="text-white/60">Total: <strong className="text-white">{counts.total}</strong></span>
          <span className="text-blue-400">Disponíveis: <strong>{counts.available}</strong></span>
          <span className="text-white/30">Bloqueadas: <strong>{counts.locked}</strong></span>
          <span className="text-purple-400">Dominadas: <strong>{counts.graduated}</strong></span>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { key: 'all', label: 'Todas' },
            { key: 'available', label: 'Disponíveis' },
            { key: 'locked', label: 'Bloqueadas' },
            { key: 'graduated', label: 'Dominadas' }
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f.key
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-white/30">Carregando...</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-white">{w.word}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs ${levelBadge(w.level)}`}>{w.level}</span>
                      {statusBadge(w)}
                    </div>
                    
                    {w.translation && (
                      <p className="text-emerald-400/80 text-sm mb-2">{w.translation}</p>
                    )}
                    
                    {/* Frases de origem */}
                    {w.phrases.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-white/20 uppercase tracking-wider">Aparece nas frases:</p>
                        {w.phrases.slice(0, 3).map((pw, i) => (
                          <p key={i} className="text-sm text-white/50 truncate">
                            <span className="text-white/30">“</span>
                            {pw.phrase.text}
                            <span className="text-white/30">”</span>
                          </p>
                        ))}
                        {w.phrases.length > 3 && (
                          <p className="text-xs text-white/30">+{w.phrases.length - 3} mais</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Progress indicator */}
                  {w.srsRecords.length > 0 && (
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-white/30">
                        Repetições: {w.srsRecords[0].repetitions}
                      </div>
                      <div className="text-xs text-white/30">
                        EF: {w.srsRecords[0].easeFactor.toFixed(1)}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-white/30">Nenhuma palavra encontrada para este filtro.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
