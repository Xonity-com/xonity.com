import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../lib/hooks'

const LINES = [
  'init core.runtime',
  'mount design.system',
  'link aem.delivery',
  'verify edge.nodes',
  'handshake complete',
]

/** Short boot sequence shown once on first load. */
export default function Boot() {
  const reduced = usePrefersReducedMotion()
  const [progress, setProgress] = useState(0)
  const [line, setLine] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (reduced) {
      setDone(true)
      document.body.classList.remove('is-locked')
      return
    }

    document.body.classList.add('is-locked')
    const started = performance.now()
    const total = 1500
    let raf = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / total)
      setProgress(Math.round(t * 100))
      setLine(Math.min(LINES.length - 1, Math.floor(t * LINES.length)))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setDone(true)
        document.body.classList.remove('is-locked')
      }
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      document.body.classList.remove('is-locked')
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div className={`boot${done ? ' is-done' : ''}`} aria-hidden={done} role="status">
      <div className="boot__inner">
        <div className="boot__row">
          <span>Xonity</span>
          <span>{progress}%</span>
        </div>
        <div className="boot__bar">
          <div className="boot__fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="boot__log">&gt; {LINES[line]}</div>
      </div>
    </div>
  )
}
