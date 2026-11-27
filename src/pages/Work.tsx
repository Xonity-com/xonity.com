import { useMemo, useState } from 'react'
import { CtaBand, Panel, PageHero } from '../components/Ui'
import { WORK, type CaseStudy } from '../lib/content'

const FILTERS = ['All', 'Websites', 'Enterprise', 'AEM'] as const
type Filter = (typeof FILTERS)[number]

function Card({ item }: { item: CaseStudy }) {
  return (
    <Panel className="work-card reveal">
      <div
        className="work-card__visual"
        style={{ background: `radial-gradient(460px circle at 85% 0%, ${item.hue}, transparent 64%)` }}
      />
      <div className="work-card__top">
        <span className="work-card__sector">{item.sector}</span>
        <span className="chip">{item.category}</span>
      </div>
      <div className="work-card__body">
        <h3 className="work-card__title">{item.title}</h3>
        <p className="work-card__text">{item.text}</p>
        <div className="stack-grid" style={{ marginBottom: '1.25rem' }}>
          {item.tags.map((t) => (
            <span className="stack-chip" key={t} style={{ fontSize: '0.72rem', padding: '0.35rem 0.7rem' }}>
              {t}
            </span>
          ))}
        </div>
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
  )
}

export default function Work() {
  const [filter, setFilter] = useState<Filter>('All')
  const items = useMemo(
    () => (filter === 'All' ? WORK : WORK.filter((w) => w.category === filter)),
    [filter],
  )

  return (
    <div className="page">
      <PageHero
        tag="Case studies"
        title={
          <>
            Work that is still <span className="gradient-text">running in production</span>
          </>
        }
        text="Client names are under NDA more often than not. The architectures, the constraints and the numbers are real."
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="filters reveal" role="group" aria-label="Filter case studies">
            {FILTERS.map((f) => (
              <button
                type="button"
                key={f}
                className={`filter-btn${filter === f ? ' is-active' : ''}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
                {f !== 'All' ? ` (${WORK.filter((w) => w.category === f).length})` : ` (${WORK.length})`}
              </button>
            ))}
          </div>

          <div className="work-grid">
            {items.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        tag="Your turn"
        title="What would your case study say?"
        text="Bring us the system everyone avoids touching. That is usually where the interesting numbers come from."
      />
    </div>
  )
}
