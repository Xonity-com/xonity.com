import { Link } from 'react-router-dom'
import { COMPANY, SERVICES } from '../lib/content'
import { Logo } from './Icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div>
            <Link to="/" className="logo" style={{ marginBottom: '1.1rem' }}>
              <Logo className="logo__mark" />
              <span>
                Xonity<span className="logo__dot">.</span>
              </span>
            </Link>
            <p className="muted" style={{ fontSize: '0.92rem', maxWidth: '34ch' }}>
              Websites, enterprise applications and Adobe Experience Manager solutions — engineered to
              outlast the roadmap.
            </p>
            <div className="chip chip--live" style={{ marginTop: '1.5rem' }}>
              <span className="pulse-dot" />
              Taking projects for Q2 2027
            </div>
          </div>

          <div>
            <h3 className="footer__title">Services</h3>
            <ul className="footer__list">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services#${s.slug}`}>{s.title.split(' & ')[0].split(' (')[0]}</Link>
                </li>
              ))}
              <li>
                <Link to="/services#engagements">Engagement models</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer__title">Company</h3>
            <ul className="footer__list">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/work">Case studies</Link>
              </li>
              <li>
                <a href={`mailto:${COMPANY.careers}`}>Careers</a>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer__title">Reach us</h3>
            <ul className="footer__list">
              <li>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </li>
              <li>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}>{COMPANY.phone}</a>
              </li>
              <li>
                <span>{COMPANY.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__wordmark" aria-hidden="true">
          XONITY
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {COMPANY.name} s.r.o. — all systems nominal
          </span>
          <span>Prague · Brno · Remote</span>
        </div>
      </div>
    </footer>
  )
}
