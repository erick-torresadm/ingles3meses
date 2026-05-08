'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { sounds } from '@/lib/sounds'

interface User {
  id: number
  name: string
  email: string
  level: string
  targetLevel: string
  xp: number
  gems: number
  title: string
  dayStreak: number
  weekStreak: number
  totalPhrases: number
  totalWords: number
  masteredPhrases: number
  masteredWords: number
  streakDays: number
}

interface Stats {
  todayReviews: number
  dueCards: number
  learnedPhrases: number
  learnedWords: number
  accuracy: number
  currentStreak: number
  level: string
  todayXp: number
  unlockedWords: number
}

// XP needed per level
const xpPerLevel = (level: number) => Math.floor(100 * Math.pow(1.5, level - 1))

const levelTitles: Record<string, string> = {
  1: "🌱 Iniciante",
  2: "📚 Estudante",
  3: "🎓 Aprendizado",
  4: "💪 Praticante",
  5: "⭐ Expert",
  6: "🏆 Mestre",
  7: "🔥 Lendário",
  8: "👑 Imperador",
  9: "🌟 Divino",
  10: "💎 Lendário",
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [initializing, setInitializing] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [xpGain, setXpGain] = useState<{ amount: number; show: boolean }>({ amount: 0, show: false })

  useEffect(() => { fetchUserData() }, [])

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (!res.ok) {
        router.push('/login')
        return
      }
      const data = await res.json()
      setUser(data.user)

      const statsRes = await fetch('/api/user/stats')
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInitialize = async () => {
    setInitializing(true)
    sounds.click()
    try {
      const res = await fetch('/api/user/init', { method: 'POST' })
      if (res.ok) {
        sounds.success()
        const statsRes = await fetch('/api/user/stats')
        if (statsRes.ok) {
          setStats(await statsRes.json())
        }
      }
    } catch (error) {
      console.error('Init error:', error)
    } finally {
      setInitializing(false)
    }
  }

  const handleLogout = async () => {
    sounds.click()
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const userLevel = user ? Math.floor(user.xp / 500) + 1 : 1
  const currentLevelXp = user ? user.xp % 500 : 0
  const nextLevelXp = 500
  const xpProgress = (currentLevelXp / nextLevelXp) * 100

  const levelColor = (level: string) => {
    const colors: Record<string, string> = {
      A1: 'from-green-400 to-emerald-500',
      A2: 'from-emerald-400 to-teal-500',
      B1: 'from-blue-400 to-indigo-500',
      B2: 'from-indigo-400 to-purple-500',
      C1: 'from-purple-400 to-pink-500',
      C2: 'from-pink-400 to-rose-500',
    }
    return colors[level] || 'from-gray-400 to-gray-500'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-6">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-lg border-b border-white/10 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-lg">
              FS
            </div>
            <span className="font-bold text-lg hidden sm:block">FluentSRS</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* XP Badge */}
            <div className="flex items-center gap-1 sm:gap-2 bg-yellow-500/20 px-2 sm:px-3 py-1 rounded-full">
              <span className="text-xs sm:text-base">⚡</span>
              <span className="text-xs sm:text-sm font-bold text-yellow-400">{user?.xp || 0}</span>
            </div>
            {/* Gems Badge */}
            <div className="flex items-center gap-1 sm:gap-2 bg-purple-500/20 px-2 sm:px-3 py-1 rounded-full">
              <span className="text-xs sm:text-base">💎</span>
              <span className="text-xs sm:text-sm font-bold text-purple-400">{user?.gems || 0}</span>
            </div>
            <button onClick={handleLogout} className="text-white/50 hover:text-white text-sm">
              <span className="hidden sm:inline">Sair</span>
              <span className="sm:hidden">🚪</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-3 sm:px-4 pt-4">
        {/* User Info */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">Olá, {user?.name}! 👋</h1>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${levelColor(stats?.level || 'A1')}`}>
                  {stats?.level || 'A1'}
                </span>
                <span className="text-white/50">•</span>
                <span className="text-purple-400">{user?.title || 'Novato'}</span>
                <span className="text-white/50">•</span>
                <span className="text-orange-400">🔥 {user?.dayStreak || 0} dias</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-slate-800/50 rounded-xl p-3 text-center min-w-[80px]">
                <div className="text-2xl mb-1">🔥</div>
                <div className="text-xl font-bold text-orange-400">{stats?.currentStreak || 0}</div>
                <div className="text-xs text-white/40">Sequência</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-3 text-center min-w-[80px]">
                <div className="text-2xl mb-1">💎</div>
                <div className="text-xl font-bold text-purple-400">{user?.gems || 0}</div>
                <div className="text-xs text-white/40">Gemas</div>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-purple-400">Nível {userLevel}</span>
              <span className="text-white/40">{currentLevelXp}/{nextLevelXp} XP</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Main Action */}
        {stats?.dueCards === undefined || stats?.dueCards === 0 ? (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center border border-white/10">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Bem-vindo ao FluentSRS!</h2>
            <p className="text-white/50 text-sm sm:text-base mb-6">
              Você precisa inicializar seus dados para começar a estudar.
            </p>
            <button
              onClick={handleInitialize}
              disabled={initializing}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 active:scale-95"
            >
              {initializing ? 'Inicializando...' : '🚀 Começar a Estudar'}
            </button>
          </div>
        ) : (
          <>
            {/* Study Button */}
            <motion.button
              onClick={() => { sounds.click(); router.push('/study') }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-6 sm:py-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl font-bold text-xl sm:text-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all mb-4"
            >
              📚 Estudar Agora
              <span className="block text-lg font-normal text-white/80 mt-1">
                {stats?.dueCards} cartões para hoje
              </span>
            </motion.button>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-1">✅</div>
                <div className="text-2xl font-bold text-emerald-400">{stats?.learnedPhrases || 0}</div>
                <div className="text-xs text-white/40">Frases</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-1">📝</div>
                <div className="text-2xl font-bold text-blue-400">{stats?.learnedWords || 0}</div>
                <div className="text-xs text-white/40">Palavras</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-2xl font-bold text-yellow-400">{stats?.accuracy || 0}%</div>
                <div className="text-xs text-white/40">Precisão</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-2xl font-bold text-purple-400">+{stats?.todayXp || 0}</div>
                <div className="text-xs text-white/40">XP Hoje</div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                onClick={() => { sounds.click(); router.push('/progress') }}
                whileTap={{ scale: 0.95 }}
                className="py-4 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2"
              >
                <span>📊</span>
                <span className="hidden sm:inline">Ver Progresso</span>
                <span className="sm:hidden">Progresso</span>
              </motion.button>
              <motion.button
                onClick={() => { sounds.click(); router.push('/words') }}
                whileTap={{ scale: 0.95 }}
                className="py-4 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2"
              >
                <span>📚</span>
                <span className="hidden sm:inline">Vocabulário</span>
                <span className="sm:hidden">Palavras</span>
              </motion.button>
            </div>
          </>
        )}

        {/* Achievements Preview */}
        <div className="mt-6 bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            🏆 Conquistas
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            <AchievementBadge emoji="🌱" name="Início" active={stats?.todayReviews ? stats.todayReviews > 0 : false} />
            <AchievementBadge emoji="🔥" name="Sequência" active={(user?.dayStreak || 0) >= 3} />
            <AchievementBadge emoji="⭐" name="Perfeito" active={(stats?.accuracy || 0) >= 90} />
            <AchievementBadge emoji="🎯" name="10 Cartões" active={(stats?.todayReviews || 0) >= 10} />
            <AchievementBadge emoji="💎" name="Gemas" active={(user?.gems || 0) >= 10} />
            <AchievementBadge emoji="👑" name="Mestre" active={(user?.xp || 0) >= 1000} />
          </div>
        </div>
      </main>

      {/* Level Up Modal */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setShowLevelUp(false)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-center max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-2">LEVEL UP!</h2>
              <p className="text-xl mb-4">Você atingiu o nível {userLevel}!</p>
              <p className="text-white/80">{levelTitles[userLevel as keyof typeof levelTitles]}</p>
              <button
                onClick={() => setShowLevelUp(false)}
                className="mt-6 px-8 py-3 bg-white/20 rounded-xl font-bold hover:bg-white/30 transition"
              >
                Continuar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AchievementBadge({ emoji, name, active }: { emoji: string; name: string; active: boolean }) {
  return (
    <div className={`p-3 rounded-xl text-center border transition-all ${
      active 
        ? 'bg-yellow-500/20 border-yellow-500/50' 
        : 'bg-white/5 border-white/10 opacity-40'
    }`}>
      <div className="text-2xl mb-1">{emoji}</div>
      <div className={`text-xs ${active ? 'text-yellow-400' : 'text-white/40'}`}>{name}</div>
    </div>
  )
}