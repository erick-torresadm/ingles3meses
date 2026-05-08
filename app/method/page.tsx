'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MethodPage() {
  const [expandedMonth, setExpandedMonth] = useState(1)

  const months = [
    {
      month: 1,
      title: "Fundamentos",
      subtitle: "Semanas 1-4",
      focus: "Dominar estrutura básica e frases do dia-a-dia",
      daily: [
        "15 min - Revisar tarjetas SRS (frases novas)",
        "30 min - Estudar novas frases (10-15 por dia)",
        "15 min - Prática de pronúncia e listening",
      ],
      targets: [
        "100+ frases do cotidiano",
        "300+ palavras básicas",
        "Present tense, questions, negatives",
        "Vocabulário: família, trabalho, rotina",
      ],
      levels: ["A1"]
    },
    {
      month: 2,
      title: "Expansão",
      subtitle: "Semanas 5-8",
      focus: "Gramática intermediária e vocabulário diversificado",
      daily: [
        "15 min - Revisão SRS (frases + palavras liberadas)",
        "30 min - Novas frases e palavras",
        "15 min - Reading e listening practice",
      ],
      targets: [
        "200+ frases intermediárias",
        "600+ palavras no vocabulário",
        "Past tense, perfect, modals",
        "Conversação básica",
      ],
      levels: ["A2", "B1"]
    },
    {
      month: 3,
      title: "Fluência",
      subtitle: "Semanas 9-12",
      focus: "Aprofundamento e produção avançada",
      daily: [
        "20 min - Revisão SRS (foco em palavras)",
        "25 min - Frases complexas e expressões idiomáticas",
        "15 min - Speaking e writing práticos",
      ],
      targets: [
        "350+ frases avançadas",
        "1000+ palavras ativas",
        "Todas estruturas gramaticais",
        "Expressar ideias abstratas",
      ],
      levels: ["B1", "B2"]
    }
  ]

  const tips = [
    { icon: "⏰", title: "Consistência", desc: "Melhor 30min todo dia que 2h uma vez por semana" },
    { icon: "🎯", title: "Foco no SRS", desc: "Revise suas tarjetas antes de aprender novas" },
    { icon: "🧠", title: "Ideia geral", desc: "Entenda frases, não decore palavras isoladas" },
    { icon: "👂", title: "Input", desc: "Ouça podcasts em inglês 15min/day" },
    { icon: "📖", title: "Leitura", desc: "Leia textos simples em inglês todo dia" },
    { icon: "💬", title: "Prática", desc: "Fale em voz alta as frases que aprende" },
  ]

  return (
    <main className="min-h-screen bg-[#0f172a]">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-teal-600/10 to-cyan-600/10" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
        <nav className="flex justify-between items-center mb-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center font-bold text-white text-sm">FS</div>
            <span className="text-xl font-bold text-white">FluentSRS</span>
          </Link>
          <Link href="/" className="text-white/50 hover:text-white transition">← Voltar</Link>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🚀 Método 3 Meses
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            1 hora por dia para alcançar nível intermediário em inglês
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">📅 Cronograma</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {months.map((m) => (
              <button
                key={m.month}
                onClick={() => setExpandedMonth(m.month === expandedMonth ? 0 : m.month)}
                className={`flex-1 p-4 rounded-2xl border transition-all text-left ${
                  expandedMonth === m.month 
                    ? 'bg-emerald-500/20 border-emerald-500/50' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-emerald-400">Mês {m.month}</span>
                  <span className="text-white/40 text-sm">{m.subtitle}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">{m.title}</h3>
                <p className="text-sm text-white/50">{m.focus}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Expanded Content */}
        {expandedMonth > 0 && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-12">
            {months.filter(m => m.month === expandedMonth).map(m => (
              <div key={m.month}>
                <h3 className="text-2xl font-bold text-white mb-4">📋 Plano Mensal - {m.title}</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-400 mb-3">⏱️ Rotina Diária</h4>
                    <ul className="space-y-3">
                      {m.daily.map((d, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/70">
                          <span className="text-emerald-400">▸</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-400 mb-3">🎯 Metas</h4>
                    <ul className="space-y-2">
                      {m.targets.map((t, i) => (
                        <li key={i} className="flex items-center gap-2 text-white/70">
                          <span className="w-2 h-2 bg-teal-400 rounded-full" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-2">📚 Níveis CEFR: {m.levels.join(", ")}</h4>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">💡 Dicas do Sistema</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {tips.map((tip, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-3xl mb-2">{tip.icon}</div>
                <h4 className="text-white font-semibold mb-1">{tip.title}</h4>
                <p className="text-sm text-white/50">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">📊 Seu Progresso no Sistema</h3>
          <p className="text-white/60 mb-6">
            O SRS adapta automaticamente o espaçamento baseado nas suas respostas
          </p>
          <div className="flex justify-center gap-8">
            <div>
              <div className="text-4xl font-bold text-emerald-400">488</div>
              <div className="text-white/50">Frases</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-400">774</div>
              <div className="text-white/50">Palavras</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400">1365</div>
              <div className="text-white/50">Conexões</div>
            </div>
          </div>
          <Link href="/study" className="inline-block mt-8 px-8 py-4 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition">
            Começar Agora →
          </Link>
        </div>
      </div>
    </main>
  )
}