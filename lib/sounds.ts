// Sound utility using Web Audio API - no external files needed

class SoundEngine {
  private audioContext: AudioContext | null = null

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return this.audioContext
  }

  playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
    try {
      const ctx = this.getContext()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.value = frequency
      oscillator.type = type

      gainNode.gain.setValueAtTime(volume, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + duration)
    } catch (e) {
      // Silent fail if audio not supported
    }
  }

  // Success sound - cheerful ascending
  success() {
    this.playTone(523.25, 0.1, 'sine', 0.3) // C5
    setTimeout(() => this.playTone(659.25, 0.1, 'sine', 0.3), 100) // E5
    setTimeout(() => this.playTone(783.99, 0.15, 'sine', 0.3), 200) // G5
  }

  // Perfect answer - more elaborate
  perfect() {
    this.playTone(523.25, 0.1, 'sine', 0.3)
    setTimeout(() => this.playTone(659.25, 0.1, 'sine', 0.3), 80)
    setTimeout(() => this.playTone(783.99, 0.1, 'sine', 0.3), 160)
    setTimeout(() => this.playTone(1046.50, 0.2, 'sine', 0.3), 240) // C6
  }

  // Wrong answer - descending
  wrong() {
    this.playTone(200, 0.15, 'square', 0.15)
    setTimeout(() => this.playTone(150, 0.2, 'square', 0.1), 150)
  }

  // Level up - celebratory
  levelUp() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]
    notes.forEach((note, i) => {
      setTimeout(() => this.playTone(note, 0.15, 'sine', 0.25), i * 80)
    })
  }

  // New achievement sound
  achievement() {
    this.playTone(880, 0.1, 'sine', 0.3)
    setTimeout(() => this.playTone(1108.73, 0.1, 'sine', 0.3), 100)
    setTimeout(() => this.playTone(1318.51, 0.1, 'sine', 0.3), 200)
    setTimeout(() => this.playTone(1760, 0.25, 'sine', 0.3), 300)
  }

  // Button click
  click() {
    this.playTone(800, 0.05, 'sine', 0.1)
  }

  // Card flip
  flip() {
    this.playTone(400, 0.05, 'sine', 0.15)
    setTimeout(() => this.playTone(500, 0.05, 'sine', 0.15), 50)
  }

  // Streak milestone
  streak() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => this.playTone(600 + i * 100, 0.1, 'triangle', 0.2), i * 100)
    }
  }

  // Points earned
  points() {
    this.playTone(700, 0.08, 'sine', 0.2)
    setTimeout(() => this.playTone(900, 0.08, 'sine', 0.2), 80)
    setTimeout(() => this.playTone(1100, 0.1, 'sine', 0.25), 160)
  }

  // Unlock - when new content is unlocked
  unlock() {
    this.playTone(300, 0.1, 'sine', 0.2)
    setTimeout(() => this.playTone(400, 0.1, 'sine', 0.25), 100)
    setTimeout(() => this.playTone(500, 0.15, 'sine', 0.3), 200)
    setTimeout(() => this.playTone(600, 0.2, 'sine', 0.3), 300)
  }
}

export const sounds = new SoundEngine()