import { CtaBand, Panel, PageHero, SectionHead, StatBlock } from '../components/Ui'
import { COMPANY, PROCESS, STATS, VALUES } from '../lib/content'

const TIMELINE = [
  { year: '2014', text: 'Founded in Prague by four engineers who had spent too long rescuing other people’s platforms.' },
  { year: '2017', text: 'First Adobe Experience Manager practice hires. Two enterprise migrations delivered in parallel.' },
  { year: '2020', text: 'Platform-care retainers launched after clients kept asking us to keep running what we built.' },
  { year: '2023', text: 'AEM as a Cloud Service migrations become the largest single line of work.' },
  { year: '2026', text: '38 engineers across Prague, Brno and remote Europe. Still no account managers.' },
]

const DISCIPLINES = [
  { k: 'Front-end & design systems', v: 12 },
  { k: 'Enterprise / backend', v: 14 },
  { k: 'AEM specialists', v: 7 },
  { k: 'Platform & SRE', v: 5 },
]

export default function About() {
  return (
    <div className="page">
      <PageHero
        tag="About Xonity"
        title={
          <>
            A studio of <span className="gradient-text">engineers</span>, not layers.
          </>
        }
        text={`Since ${COMPANY.founded} we have built and rescued platforms for banks, manufacturers, hospitals and governments. The common thread is not an industry — it is systems that cannot afford to be rewritten again in three years.`}
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="hero__stats reveal" style={{ marginTop: 0 }}>
            {STATS.map((s) => (
              <StatBlock key={s.label} stat={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Values ---------------- */}
      <section className="section">
        <div className="shell">
          <SectionHead
            tag="Principles"
            title={
              <>
                Four commitments we <span className="gradient-text">actually enforce</span>
              </>
            }
            text="Every agency has values on a wall. These ones show up in our contracts, our code review and our handover checklist."
          />
          <div>
            {VALUES.map((v, i) => (
              <div className="value-row reveal" data-delay={i * 70} key={v.k}>
                <span className="value-row__k">{v.k}</span>
                <div>
                  <h3 className="value-row__title">{v.title}</h3>
                  <p className="value-row__text">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Team + timeline ---------------- */}
      <section className="section">
        <div className="shell split">
          <Panel className="reveal" style={{ padding: 'clamp(1.5rem, 3vw, 2.4rem)' }}>
            <span className="mono-tag">The team</span>
            <h3 className="h-lg" style={{ margin: '0.9rem 0 1.75rem' }}>
              38 people, four disciplines
            </h3>
            <div className="stack">
              {DISCIPLINES.map((d) => (
                <div key={d.k} style={{ marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    <span>{d.k}</span>
                    <span className="mono-tag" style={{ letterSpacing: '0.1em' }}>
                      {d.v}
                    </span>
                  </div>
                  <div className="boot__bar">
                    <div className="boot__fill" style={{ width: `${(d.v / 14) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="muted" style={{ fontSize: '0.88rem', marginTop: '0.5rem' }}>
              Plus the people you will never need to meet: no account directors, no delivery managers
              relaying messages between you and the build.
            </p>
          </Panel>

          <div className="reveal" data-delay="120">
            <span className="mono-tag">Trajectory</span>
            <h3 className="h-lg" style={{ margin: '0.9rem 0 2rem' }}>
              Eleven years, one direction
            </h3>
            <div className="stack">
              {TIMELINE.map((t) => (
                <div className="value-row" key={t.year} style={{ padding: '1.15rem 0' }}>
                  <span className="value-row__k" style={{ color: 'var(--cyan)' }}>
                    {t.year}
                  </span>
                  <p className="value-row__text" style={{ fontSize: '0.92rem' }}>
                    {t.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Process recap ---------------- */}
      <section className="section">
        <div className="shell">
          <SectionHead
            tag="Delivery"
            title={
              <>
                The same four phases, <span className="gradient-text">every engagement</span>
              </>
            }
          />
          <div className="timeline">
            {PROCESS.map((step, i) => (
              <div className="tl-step reveal" data-delay={i * 80} key={step.n}>
                <div className="tl-step__dot">{step.n}</div>
                <h3 className="tl-step__title">{step.title}</h3>
                <p className="tl-step__text">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        tag="Work with us"
        title="Fewer slides. Earlier code."
        text="If that sounds like the kind of partner you are missing, we should talk."
        secondary={{ to: '/work', label: 'See the work' }}
      />
    </div>
  )
}
