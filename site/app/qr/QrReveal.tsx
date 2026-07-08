'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './qr.module.css'

const SIZE = 25
const CENTER = (SIZE - 1) / 2
const MAX_DIST = Math.hypot(CENTER, CENTER)

// Ritardo massimo dello stagger di "materializzazione" (ms)
const STAGGER = 900
// La scansione parte a 1000ms (delay CSS) e dura 1200ms -> finisce a 2200ms.
// Redirect ~0.8s dopo la fine della scansione; l'uscita ~600ms prima.
const EXIT_AT = 2400
const REDIRECT_AT = 3000
// Redirect quasi immediato per chi preferisce meno animazioni
const REDUCED_REDIRECT_AT = 350

type Cell = {
  r: number
  c: number
  finder: boolean
  delay: number
}

/**
 * Costruisce una matrice che *sembra* un QR reale: 3 finder pattern agli
 * angoli, timing pattern, alignment pattern e dati pseudo-casuali ma
 * deterministici (nessun mismatch di hydration). Non è scansionabile: è puro
 * effetto scenico prima del redirect.
 */
function buildCells(): Cell[] {
  const dark: boolean[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(false))
  const finder: boolean[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(false))
  const reserved: boolean[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(false))

  const placeFinder = (r0: number, c0: number) => {
    for (let i = -1; i <= 7; i++) {
      for (let j = -1; j <= 7; j++) {
        const r = r0 + i
        const c = c0 + j
        if (r < 0 || r >= SIZE || c < 0 || c >= SIZE) continue
        reserved[r][c] = true
        if (i >= 0 && i <= 6 && j >= 0 && j <= 6) {
          const isDark =
            i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)
          dark[r][c] = isDark
          finder[r][c] = isDark
        } else {
          dark[r][c] = false // separatore (quiet zone)
        }
      }
    }
  }
  placeFinder(0, 0)
  placeFinder(0, SIZE - 7)
  placeFinder(SIZE - 7, 0)

  // Timing pattern
  for (let i = 8; i < SIZE - 8; i++) {
    if (!reserved[6][i]) {
      dark[6][i] = i % 2 === 0
      reserved[6][i] = true
    }
    if (!reserved[i][6]) {
      dark[i][6] = i % 2 === 0
      reserved[i][6] = true
    }
  }

  // Alignment pattern 5x5 in basso a destra
  const ac = SIZE - 7
  for (let i = -2; i <= 2; i++) {
    for (let j = -2; j <= 2; j++) {
      const r = ac + i
      const c = ac + j
      dark[r][c] = Math.max(Math.abs(i), Math.abs(j)) !== 1
      reserved[r][c] = true
    }
  }

  // PRNG deterministico (mulberry32) per i moduli dati
  let seed = 0x9e3779b9
  const rand = () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!reserved[r][c]) dark[r][c] = rand() < 0.46
    }
  }

  const cells: Cell[] = []
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!dark[r][c]) continue
      const dist = Math.hypot(r - CENTER, c - CENTER)
      cells.push({
        r,
        c,
        finder: finder[r][c],
        delay: (dist / MAX_DIST) * STAGGER,
      })
    }
  }
  return cells
}

export default function QrReveal({ destination }: { destination: string }) {
  const cells = useMemo(buildCells, [])
  const [exiting, setExiting] = useState(false)
  const done = useRef(false)

  useEffect(() => {
    const go = () => {
      if (done.current) return
      done.current = true
      window.location.replace(destination)
    }

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      const t = window.setTimeout(go, REDUCED_REDIRECT_AT)
      return () => window.clearTimeout(t)
    }

    const exitTimer = window.setTimeout(() => setExiting(true), EXIT_AT)
    const redirectTimer = window.setTimeout(go, REDIRECT_AT)
    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(redirectTimer)
    }
  }, [destination])

  const skip = () => {
    if (done.current) return
    done.current = true
    window.location.replace(destination)
  }

  return (
    <div
      className={styles.overlay}
      role="status"
      aria-live="polite"
      aria-label="Reindirizzamento in corso"
    >
      {/* Prefetch della destinazione per chi ha connessione lenta */}
      <link rel="prefetch" href={destination} />

      <div className={`${styles.stage} ${exiting ? styles.exiting : ''}`}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-hidden="true"
          shapeRendering="geometricPrecision"
        >
          {cells.map((cell) => (
            <rect
              key={`${cell.r}-${cell.c}`}
              className={`${styles.cell} ${cell.finder ? styles.finder : ''}`}
              x={cell.c + 0.04}
              y={cell.r + 0.04}
              width={0.92}
              height={0.92}
              rx={0.22}
              style={{ animationDelay: `${cell.delay}ms` }}
            />
          ))}
        </svg>
        <div className={styles.scan} aria-hidden="true" />
      </div>

      <div className={styles.caption}>
        <span className={styles.dot}>›</span>
        <span>ti porto sul sito</span>
        <span className={styles.cursor} aria-hidden="true" />
      </div>

      <button type="button" className={styles.skip} onClick={skip}>
        salta →
      </button>
    </div>
  )
}
