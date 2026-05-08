'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function ImportPage() {
  const [tab, setTab] = useState<'phrase' | 'bulk' | 'file' | 'seed'>('phrase')
  const [form, setForm] = useState({ text: '', translation: '', level: 'A1', partOfSpeech: '' })
  const [bulkText, setBulkText] = useState('')
  const [fileText, setFileText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  // Stats
  const [stats, setStats] = useState({ phrases: 0, words: 0, links: 0 })
  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(d => setStats(d))
  }, [])

  const addPhrase = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.text || !form.translation) return
    setLoading(true)
    try {
      const res = await fetch('/api/phrases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setResult({ success: true, message: `"${form.text}" adicionada!` })
        setForm({ text: '', translation: '', level: 'A1', partOfSpeech: '' })
      } else {
        const err = await res.json()
        setResult({ error: err.error || 'Erro ao adicionar' })
      }
    } catch {
      setResult({ error: 'Erro de conexão' })
    }
    setLoading(false)
  }

  const importBulk = async () => {
    if (!bulkText.trim()) return
    setLoading(true)
    setResult(null)
    let added = 0, errors = 0
    const lines = bulkText.split('\n').filter(l => l.trim() && l.includes('|'))

    for (const line of lines) {
      const [text, translation, level] = line.split('|').map(s => s?.trim())
      if (!text || !translation) { errors++; continue }
      try {
        const res = await fetch('/api/phrases', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, translation, level: level || 'A1' })
        })
        if (res.ok) added++
        else errors++
      } catch { errors++ }
    }
    setResult({ added, errors, total: lines.length })
    setBulkText('')
    setLoading(false)
  }

  const seedDatabase = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/seed')
      setResult(await res.json())
    } catch { setResult({ error: 'Erro ao popular' }) }
    setLoading(false)
  }

  const format = `Formato: frase | tradução | nível

Exemplo:
Hello, how are you?|Olá, como você está?|A1
I am learning English.|Estou aprendendo inglês.|A1`

  return (
    <main className="min-h-screen bg-[#0f172a] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-teal-600/5 to-cyan-600/5" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center font-bold text-white text-sm">FS</div>
            <span className="text-xl font-bold text-white">FluentSRS</span>
          </Link>
        </nav>

        <h1 className="text-3xl font-bold text-white mb-2">Adicionar Conteúdo</h1>
        <p className="text-white/40 mb-6">
          Banco atual: {stats.phrases} frases • {stats.words} palavras • {stats.links} conexões
        </p>

        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { key: 'phrase', label: '➕ Uma Frase' },
            { key: 'bulk', label: '📋 Múltiplas' },
            { key: 'seed', label: '🚀 Seed Completo' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === t.key ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'phrase' && (
            <motion.div key="phrase" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <form onSubmit={addPhrase} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Adicionar Uma Frase</h2>
                
                <div>
                  <label className="block text-sm text-white/60 mb-2">🇬🇧 Frase em Inglês *</label>
                  <input type="text" value={form.text} onChange={e => setForm({...form, text: e.target.value})}
                    placeholder="Ex: I want to learn English fluently"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50" required />
                </div>
                
                <div>
                  <label className="block text-sm text-white/60 mb-2">🇧🇷 Tradução em Português *</label>
                  <input type="text" value={form.translation} onChange={e => setForm({...form, translation: e.target.value})}
                    placeholder="Ex: Eu quero aprender inglês fluentemente"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Nível</label>
                    <select value={form.level} onChange={e => setForm({...form, level: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50">
                      {['A1','A2','B1','B2','C1','C2'].map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Tipo</label>
                    <input type="text" value={form.partOfSpeech} onChange={e => setForm({...form, partOfSpeech: e.target.value})}
                      placeholder="ex: verb, noun"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50" />
                  </div>
                </div>
                
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-bold text-white hover:from-emerald-600 hover:to-teal-700 transition disabled:opacity-50">
                  {loading ? 'Adicionando...' : '+ Adicionar Frase'}
                </button>
              </form>
            </motion.div>
          )}

          {tab === 'bulk' && (
            <motion.div key="bulk" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">Importar Múltiplas</h2>
                  <Link href="/method" className="text-emerald-400 text-sm hover:underline">Ver formato →</Link>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <p className="text-sm text-blue-300 mb-2">📝 <strong>Formato:</strong></p>
                  <code className="text-xs text-blue-200 block">frase | tradução | nível</code>
                </div>
                
                <textarea value={bulkText} onChange={e => setBulkText(e.target.value)}
                  placeholder={format}
                  className="w-full h-64 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm placeholder-white/20 focus:outline-none focus:border-emerald-500/50" />
                
                <button onClick={importBulk} disabled={loading || !bulkText.trim()}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-bold text-white hover:from-emerald-600 hover:to-teal-700 transition disabled:opacity-50">
                  {loading ? 'Importando...' : `Importar ${bulkText.split('\n').filter(l => l.includes('|')).length} linhas`}
                </button>
              </div>
            </motion.div>
          )}

          {tab === 'seed' && (
            <motion.div key="seed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h2 className="text-2xl font-bold text-white mb-2">Seed Completo</h2>
                <p className="text-white/50 mb-6 max-w-md mx-auto">
                  Adiciona +400 frases e +3000 palavras ao banco. 
                  Inclui frases do cotidiano, trabalho, viagem, etc.
                </p>
                <button onClick={seedDatabase} disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-bold text-white hover:from-emerald-600 hover:to-teal-700 transition disabled:opacity-50">
                  {loading ? 'Populando...' : 'Adicionar Todo Conteúdo'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-5 rounded-2xl border ${
              result.error ? 'bg-red-500/10 border-red-500/30 text-red-400'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}>
            {result.error ? (
              <p>❌ {result.error}</p>
            ) : result.success ? (
              <p>✅ {result.message}</p>
            ) : (
              <div className="space-y-1">
                {result.added !== undefined && <p>✅ Adicionadas: {result.added}</p>}
                {result.errors > 0 && <p>❌ Erros: {result.errors}</p>}
                {result.total && <p>📊 Total: {result.total}</p>}
                {result.wordsAdded > 0 && <p>📝 Palavras criadas: {result.wordsAdded}</p>}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  )
}