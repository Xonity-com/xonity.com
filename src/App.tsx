import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Atmosphere, CursorGlow } from './components/Atmosphere'
import Boot from './components/Boot'
import Footer from './components/Footer'
import Nav from './components/Nav'
import ShaderField from './components/ShaderField'
import Home from './pages/Home'
import { useRevealOnScroll } from './lib/hooks'

const Services = lazy(() => import('./pages/Services'))
const Work = lazy(() => import('./pages/Work'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const TITLES: Record<string, string> = {
  '/': 'Xonity — Websites, Enterprise Applications & AEM Solutions',
  '/services': 'Services — Xonity',
  '/work': 'Case studies — Xonity',
  '/about': 'About — Xonity',
  '/contact': 'Contact — Xonity',
}

/** Resets scroll between routes and honours in-page #anchors. */
function RouteEffects() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    document.title = TITLES[pathname] ?? 'Page not found — Xonity'
  }, [pathname])

  useEffect(() => {
    if (hash) {
      // Let the lazy route paint before trying to find the anchor.
      const id = hash.slice(1)
      const attempt = (tries: number) => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (tries > 0) {
          window.setTimeout(() => attempt(tries - 1), 80)
        }
      }
      attempt(8)
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash, key])

  return null
}

function RouteFallback() {
  return (
    <div className="page" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <span className="mono-tag">Loading module…</span>
    </div>
  )
}

export default function App() {
  useRevealOnScroll()

  return (
    <>
      <Boot />
      <ShaderField />
      <Atmosphere />
      <CursorGlow />

      <a href="#main" className="btn btn--ghost btn--sm skip-link">
        Skip to content
      </a>

      <Nav />
      <RouteEffects />

      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  )
}
