import { Link } from 'react-router-dom'
import { IconArrow } from '../components/Icons'
import { CtaBand, Marquee, Panel, PageHero, SectionHead } from '../components/Ui'
import { ENGAGEMENTS, SERVICES } from '../lib/content'

export default function Services() {
  return (
    <div className="page">
      <PageHero
        tag="Services"
        title={
          <>
            Build it once.
            <br />
            <span className="gradient-text">Build it to last.</span>
          </>
        }
        text="Three practices that share the same engineers, the same quality gates and the same refusal to hand over something nobody else can maintain."
      >
        <div className="grid grid-3 reveal" data-delay="180" style={{ marginTop: '3rem' }}>
          {SERVICES.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="stack-chip" style={{ padding: '1rem 1.15rem' }}>
              {s.index} — {s.title}
            </a>
          ))}
        </div>
      </PageHero>

      <Marquee />

      {SERVICES.map((svc, i) => {
        const Icon = svc.icon
        return (
          <section className="section" id={svc.slug} key={svc.slug} style={{ scrollMarginTop: '90px' }}>
            <div className={`shell split${i % 2 === 1 ? ' split--rev' : ''}`}>
              <div className="reveal">
                <span className="svc-card__icon" style={{ marginBottom: '1.5rem' }}>
                  <Icon size={26} />
                </span>
                <span className="mono-tag">{svc.index} — Practice</span>
                <h2 className="h-xl" style={{ margin: '0.9rem 0 1.25rem' }}>
                  {svc.title}
                </h2>
                <p className="lede">{svc.blurb}</p>
                <div className="stack-grid" style={{ marginTop: '2rem' }}>
                  {svc.stack.map((t) => (
                    <span className="stack-chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <Panel className="reveal" data-delay="120" style={{ padding: 'clamp(1.5rem, 3vw, 2.4rem)' }}>
                <h3 className="h-md" style={{ marginBottom: '1.4rem' }}>
                  What you get
                </h3>
                <ul className="svc-card__list">
                  {svc.points.map((p) => (
                    <li key={p} style={{ fontSize: '0.95rem', paddingBlock: '0.3rem' }}>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="tlink" style={{ marginTop: '1.75rem' }}>
                  Discuss {svc.cta}
                  <IconArrow size={15} />
                </Link>
              </Panel>
            </div>
          </section>
        )
      })}

      {/* ---------------- Engagement models ---------------- */}
      <section className="section" id="engagements" style={{ scrollMarginTop: '90px' }}>
        <div className="shell">
          <SectionHead
            tag="Engagement models"
            title={
              <>
                Three ways to <span className="gradient-text">work with us</span>
              </>
            }
            text="Pick the shape that matches the risk. Most clients start with a discovery sprint and move into a delivery team once the unknowns are priced."
          />
          <div className="grid grid-3">
            {ENGAGEMENTS.map((e, i) => (
              <Panel className="svc-card reveal" data-delay={i * 90} key={e.title}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="svc-card__title">{e.title}</h3>
                  <span className="chip">{e.price}</span>
                </div>
                <p className="svc-card__text">{e.text}</p>
                <ul className="svc-card__list">
                  {e.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        tag="Ready when you are"
        title="Tell us what is breaking."
        text="A 30-minute call with the engineers who would do the work — not a sales team taking notes to pass on."
        secondary={{ to: '/work', label: 'See case studies' }}
      />
    </div>
  )
}
