import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { COMPANY, NAV } from '../lib/content'
import { useScrolledPast, useScrollProgress } from '../lib/hooks'
import { IconArrow, Logo } from './Icons'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const stuck = useScrolledPast(14)
  const progress = useScrollProgress()
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
    return () => document.body.classList.remove('is-locked')
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className={`nav${stuck ? ' is-stuck' : ''}`}>
        <div className="shell nav__inner">
          <Link to="/" className="logo" aria-label={`${COMPANY.name} — home`}>
            <Logo className="logo__mark" />
            <span>
              Xonity<span className="logo__dot">.</span>
            </span>
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav__cta">
            <Link to="/contact" className="btn btn--primary btn--sm">
              Start a project
              <IconArrow className="btn__arrow" size={15} />
            </Link>
            <button
              type="button"
              className={`burger${open ? ' is-open' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
        <div className="nav__progress" style={{ width: '100%', transform: `scaleX(${progress})` }} />
      </header>

      <div className={`drawer${open ? ' is-open' : ''}`} id="mobile-menu">
        <nav aria-label="Mobile">
          {NAV.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `drawer__link${isActive ? ' is-active' : ''}`}
            >
              <span className="drawer__index">{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/contact" className="btn btn--primary" style={{ marginTop: '2rem' }}>
          Start a project
          <IconArrow className="btn__arrow" />
        </Link>
      </div>
    </>
  )
}
