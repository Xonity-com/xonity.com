import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { MARQUEE, type Stat } from '../lib/content'
import { useCountUp, useSpotlight } from '../lib/hooks'
import { IconArrow } from './Icons'

/* -------- Section heading ---------------------------------------------- */

export function SectionHead({
  tag,
  title,
  text,
  align = 'left',
}: {
  tag: string
  title: ReactNode
  text?: ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <div
      className="sec-head reveal"
      style={align === 'center' ? { alignItems: 'center', textAlign: 'center', marginInline: 'auto' } : undefined}
    >
      <span className="mono-tag">{tag}</span>
      <div className="sec-head__rule" />
      <h2 className="h-xl">{title}</h2>
      {text ? <p className="lede">{text}</p> : null}
    </div>
  )
}

/* -------- Glass panel --------------------------------------------------- */

export function Panel({
  children,
  className = '',
  spotlight = true,
  ...rest
}: {
  children: ReactNode
  className?: string
  spotlight?: boolean
} & React.HTMLAttributes<HTMLDivElement>) {
  const onMove = useSpotlight<HTMLDivElement>()
  return (
    <div
      className={`panel ${spotlight ? 'spotlight ' : ''}${className}`}
      onMouseMove={spotlight ? onMove : undefined}
      {...rest}
    >
      {children}
    </div>
  )
}

/* -------- Animated statistic -------------------------------------------- */

export function StatBlock({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp(stat.value)
  const decimals = stat.decimals ?? 0
  return (
    <div className="stat">
      <span className="stat__value" ref={ref}>
        {value.toFixed(decimals)}
        {stat.suffix}
      </span>
      <span className="stat__label">{stat.label}</span>
    </div>
  )
}

/* -------- Technology marquee -------------------------------------------- */

export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* -------- Closing call to action ---------------------------------------- */

export function CtaBand({
  tag = 'Next step',
  title = 'Let’s scope the hard part first.',
  text = 'Tell us what is slow, fragile or stuck. We will come back with an architecture, a plan and a straight answer about cost.',
  primary = { to: '/contact', label: 'Start a conversation' },
  secondary,
}: {
  tag?: string
  title?: string
  text?: string
  primary?: { to: string; label: string }
  secondary?: { to: string; label: string }
}) {
  return (
    <section className="section">
      <div className="shell">
        <Panel className="cta reveal">
          <div className="cta__glow" aria-hidden="true" />
          <span className="mono-tag">{tag}</span>
          <h2 className="h-xl" style={{ maxWidth: '18ch' }}>
            {title}
          </h2>
          <p className="lede" style={{ textAlign: 'center' }}>
            {text}
          </p>
          <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to={primary.to} className="btn btn--primary">
              {primary.label}
              <IconArrow className="btn__arrow" />
            </Link>
            {secondary ? (
              <Link to={secondary.to} className="btn btn--ghost">
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </Panel>
      </div>
    </section>
  )
}

/* -------- Page header (inner pages) ------------------------------------- */

export function PageHero({
  tag,
  title,
  text,
  children,
}: {
  tag: string
  title: ReactNode
  text: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="section" style={{ paddingTop: 'clamp(3.5rem, 9vh, 6rem)' }}>
      <div className="shell">
        <span className="mono-tag reveal">{tag}</span>
        <h1 className="display reveal" data-delay="60" style={{ margin: '1.25rem 0 1.5rem', maxWidth: '16ch' }}>
          {title}
        </h1>
        <p className="lede reveal" data-delay="120">
          {text}
        </p>
        {children}
      </div>
    </section>
  )
}
