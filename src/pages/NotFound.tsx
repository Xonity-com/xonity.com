import { Link } from 'react-router-dom'
import { IconArrow } from '../components/Icons'

export default function NotFound() {
  return (
    <div className="page">
      <div className="shell nf">
        <span className="mono-tag reveal">Error · route not resolved</span>
        <div className="nf__code reveal" data-delay="60">
          404
        </div>
        <h1 className="h-lg reveal" data-delay="100">
          This path does not exist in the manifest.
        </h1>
        <p className="lede reveal" data-delay="140" style={{ textAlign: 'center' }}>
          The page moved, or it never shipped. Either way, the rest of the system is still up.
        </p>
        <div className="reveal" data-delay="180" style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" className="btn btn--primary">
            Back to home
            <IconArrow className="btn__arrow" />
          </Link>
          <Link to="/contact" className="btn btn--ghost">
            Report it
          </Link>
        </div>
      </div>
    </div>
  )
}
