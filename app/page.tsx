'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalPhrases: 0, totalWords: 0,
    dueToday: 0, phrasesDue: 0, wordsDue: 0,
    newPhrases: 0, newWords: 0,
    graduated: 0, progress: 0
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetch('/api/stats').then(r => r.json()).then(setStats)
  }, [])

  if (!mounted) return null

  const totalCards = stats.dueToday + stats.newPhrases

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0f172a]">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-teal-600/20 to-cyan-600/20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center font-bold text-xl text-white">
              FS
            </div>
            <span className="text-2xl font-bold text-white">FluentSRS</span>
          </div>
          <div className="flex gap-3">
            <Link href="/words" className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white/80 hover:bg-white/20 transition text-sm">
              📚 Vocabulário
            </Link>
            <Link href="/method" className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white/80 hover:bg-emerald-600 transition text-sm font-semibold">
              🎯 Método 3 Meses
            </Link>
            <Link href="/import" className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white/80 hover:bg-white/20 transition text-sm">
              📥 Importar
            </Link>
          </div>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white leading-tight">
            Aprenda Inglês<br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              por Frases Completas
            </span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Entenda a ideia geral primeiro. O sistema libera palavras automaticamente 
            quando você domina as frases.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard value={stats.totalPhrases} label="Frases" icon="💬" />
          <StatCard value={stats.totalWords} label="Palavras" icon="📝" />
          <StatCard value={stats.dueToday} label="Revisões Hoje" icon="⏰" color="text-amber-400" />
          <StatCard value={stats.graduated} label="Dominadas" icon="🎯" color="text-emerald-400" />
        </div>

        {/* Progress Bar */}
        {stats.totalPhrases > 0 && (
          <div className="max-w-xl mx-auto mb-10">
            <div className="flex justify-between text-sm text-white/40 mb-2">
              <span>Progresso</span>
              <span>{stats.progress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                style={{ width: `${stats.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Study Flow Info */}
        <div className="max-w-3xl mx-auto mb-10 grid md:grid-cols-3 gap-4">
          <FlowStep num="1" title="Frases" desc="Veja frases completas em inglês. Foque em entender a ideia." color="emerald" />
          <FlowStep num="2" title="Revisão SRS" desc="Avalie seu entendimento. O sistema agenda a próxima revisão." color="teal" />
          <FlowStep num="3" title="Palavras" desc="Quando dominar a frase, as palavras dela são liberadas." color="cyan" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/study')}
            className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-bold text-white text-lg 
                       hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40
                       flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
            Estudar Agora ({totalCards})
          </button>
          <Link href="/import" className="px-10 py-4 bg-white/10 border border-white/20 rounded-xl font-semibold text-white/80 
                     hover:bg-white/20 transition-all text-center">
            + Adicionar Frases
          </Link>
        </div>

        <div className="text-center mt-12 text-white/30 text-sm">
          {stats.phrasesDue > 0 ? (
            <p>{stats.phrasesDue} frases aguardando revisão · {stats.wordsDue} palavras liberadas para estudo</p>
          ) : stats.dueToday === 0 && stats.newPhrases === 0 ? (
            <p>Tudo em dia! Volte mais tarde ou adicione novas frases.</p>
          ) : null}
        </div>
      </div>
    </main>
  )
}

function StatCard({ value, label, icon, color = "text-white" }: any) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all">
      <div className="text-3xl mb-1">{icon}</div>
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-white/40 mt-1">{label}</div>
    </div>
  )
}

function FlowStep({ num, title, desc, color }: any) {
  const colors: Record<string, string> = {
    emerald: 'from-emerald-500 to-teal-500',
    teal: 'from-teal-500 to-cyan-500',
    cyan: 'from-cyan-500 to-blue-500'
  }
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center">
      <div className={`w-10 h-10 bg-gradient-to-br ${colors[color]} rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-sm`}>
        {num}
      </div>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-white/40 text-sm">{desc}</p>
    </div>
  )
}
