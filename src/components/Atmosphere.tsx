import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/hooks'

/** Static overlays: perspective grid, scanlines, film grain, vignette. */
export function Atmosphere() {
  return (
    <>
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-vignette" aria-hidden="true" />
      <div className="bg-scanlines" aria-hidden="true" />
      <div className="bg-noise" aria-hidden="true" />
    </>
  )
}

/** A soft light that trails the pointer. Skipped on touch and reduced-motion. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    el.style.opacity = '0'
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const target = { ...pos }
    let raf = 0

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX
      target.y = event.clientY
      el.style.opacity = '1'
    }
    const onLeave = () => {
      el.style.opacity = '0'
    }

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.11
      pos.y += (target.y - pos.y) * 0.11
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
