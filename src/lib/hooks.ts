import { useCallback, useEffect, useRef, useState } from 'react'

/** True when the user has asked for reduced motion. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Reveals `.reveal` elements as they scroll into view.
 *
 * Installed once for the whole app. A MutationObserver picks up nodes added
 * later — lazy-loaded routes, filtered lists — so no caller has to re-arm it.
 */
export function useRevealOnScroll(): void {
  useEffect(() => {
    const reveal = (el: HTMLElement) => {
      const delay = Number(el.dataset.delay ?? 0)
      if (delay > 0) window.setTimeout(() => el.classList.add('is-visible'), delay)
      else el.classList.add('is-visible')
    }

    if (!('IntersectionObserver' in window) || !('MutationObserver' in window)) {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          io.unobserve(entry.target)
          reveal(entry.target as HTMLElement)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    let scheduled = 0
    const scan = () => {
      scheduled = 0
      document
        .querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
        .forEach((el) => io.observe(el))
    }
    const schedule = () => {
      if (scheduled) return
      scheduled = window.requestAnimationFrame(scan)
    }

    scan()
    const mo = new MutationObserver(schedule)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
      if (scheduled) window.cancelAnimationFrame(scheduled)
    }
  }, [])
}

/** Normalised 0..1 scroll progress of the whole document. */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return progress
}

/** True once the page has scrolled past `offset` pixels. */
export function useScrolledPast(offset = 12): boolean {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return past
}

/**
 * Counts from 0 to `target` the first time the returned ref enters the
 * viewport. Honours reduced-motion by jumping straight to the value.
 */
export function useCountUp(target: number, duration = 1600) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = useState(0)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced || !('IntersectionObserver' in window)) {
      setValue(target)
      return
    }

    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setValue(target * eased)
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, duration, reduced])

  return { ref, value }
}

/** Mouse-follow sheen: writes `--mx` / `--my` onto the hovered element. */
export function useSpotlight<T extends HTMLElement>() {
  return useCallback((event: React.MouseEvent<T>) => {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }, [])
}

/** Subtle 3D tilt toward the pointer. Disabled under reduced-motion. */
export function useTilt<T extends HTMLElement>(strength = 7) {
  const reduced = usePrefersReducedMotion()

  const onMove = useCallback(
    (event: React.MouseEvent<T>) => {
      if (reduced) return
      const el = event.currentTarget
      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `perspective(900px) rotateX(${-py * strength}deg) rotateY(${px * strength}deg) translateY(-6px)`
    },
    [reduced, strength],
  )

  const onLeave = useCallback((event: React.MouseEvent<T>) => {
    event.currentTarget.style.transform = ''
  }, [])

  return { onMouseMove: onMove, onMouseLeave: onLeave }
}
