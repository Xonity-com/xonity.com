import { Link } from 'react-router-dom'
import Console from '../components/Console'
import { IconArrow } from '../components/Icons'
import { CtaBand, Marquee, Panel, SectionHead, StatBlock } from '../components/Ui'
import { CAPABILITIES, PROCESS, SERVICES, STATS, WORK } from '../lib/content'
import { useTilt } from '../lib/hooks'

function ServiceCard({ index }: { index: number }) {
  const svc = SERVICES[index]
  const tilt = useTilt<HTMLDivElement>(5)
  const Icon = svc.icon

  return (
    <Panel className="svc-card tilt reveal" data-delay={index * 90} {...tilt}>
      <span className="svc-card__num">{svc.index} / capability</span>
      <span className="svc-card__icon">
        <Icon size={26} />
      </span>
      <h3 className="svc-card__title">{svc.title}</h3>
      <p className="svc-card__text">{svc.summary}</p>
      <ul className="svc-card__list">
        {svc.points.slice(0, 3).map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <Link to={`/services#${svc.slug}`} className="tlink" style={{ marginTop: '0.75rem' }}>
        Explore {svc.short}
        <IconArrow size={15} />
      </Link>
    </Panel>
  )
}

export default function Home() {
  return (
    <div className="page">
      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <div className="shell hero__inner">
          <div>
            <div className="hero__eyebrow reveal">
              <span className="chip chip--live">
                <span className="pulse-dot" />
                Available Q2 2027
              </span>
              <span className="mono-tag">Est. 2014 · Prague</span>
            </div>

            <h1 className="display hero__title reveal" data-delay="80">
              <span className="glitch" data-text="We engineer">
                We engineer
              </span>
              <span className="gradient-text">digital systems</span>
              <span className="hero__outline">that endure.</span>
            </h1>

            <p className="lede reveal" data-delay="160">
              Xonity builds websites, enterprise applications and Adobe Experience Manager solutions for
              organisations whose software has to work on the worst day of the year — not just the demo.
            </p>

            <div className="hero__actions reveal" data-delay="220">
              <Link to="/contact" className="btn btn--primary">
                Start a project
                <IconArrow className="btn__arrow" />
              </Link>
              <Link to="/work" className="btn btn--ghost">
                See the work
              </Link>
            </div>

            <div className="hero__stats reveal" data-delay="280">
              {STATS.map((s) => (
                <StatBlock key={s.label} stat={s} />
              ))}
            </div>
          </div>

          <Console />
        </div>
      </section>

      <Marquee />

      {/* ---------------- Services ---------------- */}
      <section className="section" id="capabilities">
        <div className="shell">
          <SectionHead
            tag="What we do"
            title={
              <>
                Three disciplines, <span className="gradient-text">one engineering standard</span>
              </>
            }
            text="Most agencies pick a lane. We run the three that keep colliding in large organisations — the public face, the systems behind it, and the content platform in between."
          />

          <div className="grid grid-3">
            {SERVICES.map((_, i) => (
              <ServiceCard key={SERVICES[i].slug} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- AEM spotlight ---------------- */}
      <section className="section" id="aem-spotlight">
        <div className="shell split">
          <div className="reveal">
            <span className="mono-tag">Signature practice</span>
            <h2 className="h-xl" style={{ margin: '1rem 0 1.25rem' }}>
              Adobe Experience Manager,
              <br />
              <span className="gradient-text">done the upgradeable way</span>
            </h2>
            <p className="lede">
              Half the AEM work we are asked to rescue failed for the same reason: customisation in the wrong
              layer. We build on core components and editable templates, ship through Cloud Manager quality
              gates, and leave authors with a platform they can actually move fast on.
            </p>
            <div className="stack-grid" style={{ marginTop: '2rem' }}>
              {SERVICES[2].stack.map((t) => (
                <span className="stack-chip" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <Link to="/services#aem" className="tlink" style={{ marginTop: '2rem' }}>
              Read the AEM practice
              <IconArrow size={15} />
            </Link>
          </div>

          <Panel className="diagram reveal" data-delay="120">
            {[
              { badge: 'AUTHOR', label: 'Editable templates & core components', meta: 'governed' },
              { badge: 'API', label: 'Content fragments over GraphQL', meta: 'headless' },
              { badge: 'EDGE', label: 'Dispatcher + CDN cache strategy', meta: '~12ms TTFB' },
              { badge: 'CI/CD', label: 'Cloud Manager quality gates', meta: 'auto-rollback' },
              { badge: 'OPS', label: 'SLOs, alerting, author enablement', meta: '24/7' },
            ].map((node, i, arr) => (
              <div key={node.badge}>
                <div className="diagram__node">
                  <span className="diagram__badge">{node.badge}</span>
                  <span className="diagram__label">{node.label}</span>
                  <span className="diagram__meta">{node.meta}</span>
                </div>
                {i < arr.length - 1 ? (
                  <div className="diagram__arrow" style={{ textAlign: 'center', padding: '0.2rem 0' }}>
                    ↓
                  </div>
                ) : null}
              </div>
            ))}
          </Panel>
        </div>
      </section>

      {/* ---------------- Capabilities strip ---------------- */}
      <section className="section section--tight">
        <div className="shell grid grid-3">
          {CAPABILITIES.map((c, i) => {
            const Icon = c.icon
            return (
              <Panel key={c.title} className="svc-card reveal" data-delay={i * 80}>
                <span className="svc-card__icon">
                  <Icon size={24} />
                </span>
                <h3 className="svc-card__title" style={{ fontSize: '1.15rem' }}>
                  {c.title}
                </h3>
                <p className="svc-card__text">{c.text}</p>
              </Panel>
            )
          })}
        </div>
      </section>

      {/* ---------------- Process ---------------- */}
      <section className="section" id="process">
        <div className="shell">
          <SectionHead
            tag="How we work"
            title={
              <>
                A delivery model you can <span className="gradient-text">audit</span>
              </>
            }
            text="No discovery theatre, no 90-page deck. Four phases, each with an artefact your team can hold us to."
          />
          <div className="timeline">
            {PROCESS.map((step, i) => (
              <div className="tl-step reveal" data-delay={i * 90} key={step.n}>
                <div className="tl-step__dot">{step.n}</div>
                <h3 className="tl-step__title">{step.title}</h3>
                <p className="tl-step__text">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Selected work ---------------- */}
      <section className="section">
        <div className="shell">
          <SectionHead
            tag="Selected work"
            title={
              <>
                Platforms in production, <span className="gradient-text">not pitch decks</span>
              </>
            }
          />
          <div className="work-grid">
            {WORK.slice(0, 3).map((item, i) => (
              <Panel className="work-card reveal" data-delay={i * 90} key={item.id}>
                <div
                  className="work-card__visual"
                  style={{
                    background: `radial-gradient(420px circle at 80% 0%, ${item.hue}, transparent 62%)`,
                  }}
                />
                <div className="work-card__top">
                  <span className="work-card__sector">{item.sector}</span>
                  <span className="chip">{item.category}</span>
                </div>
                <div className="work-card__body">
                  <h3 className="work-card__title">{item.title}</h3>
                  <p className="work-card__text">{item.text}</p>
                  <div className="work-card__metrics">
                    {item.metrics.map((m) => (
                      <div className="work-card__metric" key={m.label}>
                        <b>{m.value}</b>
                        <span>{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: '2.5rem' }}>
            <Link to="/work" className="btn btn--ghost">
              All case studies
              <IconArrow className="btn__arrow" size={15} />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand secondary={{ to: '/services', label: 'Browse services' }} />
    </div>
  )
}
