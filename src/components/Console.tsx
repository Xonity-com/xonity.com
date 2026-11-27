import { Fragment } from 'react'

type Token = { t: string; c?: string }

const LINES: Token[][] = [
  [{ t: '// xonity.delivery.manifest', c: 'tk-com' }],
  [
    { t: 'export const ', c: 'tk-key' },
    { t: 'platform ', c: 'tk-var' },
    { t: '= {' },
  ],
  [
    { t: '  web' },
    { t: ': ' },
    { t: "'edge-rendered'", c: 'tk-str' },
    { t: ',' },
  ],
  [
    { t: '  enterprise' },
    { t: ': ' },
    { t: "'event-driven'", c: 'tk-str' },
    { t: ',' },
  ],
  [
    { t: '  aem' },
    { t: ': ' },
    { t: "'cloud-service'", c: 'tk-str' },
    { t: ',' },
  ],
  [
    { t: '  budget' },
    { t: ': { lcp' },
    { t: ': ' },
    { t: '800', c: 'tk-num' },
    { t: ', cls' },
    { t: ': ' },
    { t: '0.05', c: 'tk-num' },
    { t: ' },' },
  ],
  [{ t: '}' }],
  [],
  [
    { t: 'await ', c: 'tk-key' },
    { t: 'xonity', c: 'tk-var' },
    { t: '.' },
    { t: 'ship', c: 'tk-fn' },
    { t: '(platform)' },
  ],
]

const SPEED = 0.014 // seconds per character

export default function Console() {
  let elapsed = 0.35

  return (
    <div className="panel console reveal" data-delay="200" aria-hidden="true">
      <div className="console__bar">
        <span className="console__dot" style={{ background: '#ff5f57' }} />
        <span className="console__dot" style={{ background: '#febc2e' }} />
        <span className="console__dot" style={{ background: '#28c840' }} />
        <span className="console__file">manifest.ts</span>
      </div>
      <div className="console__body">
        {LINES.map((tokens, i) => {
          const text = tokens.map((tk) => tk.t).join('')
          const chars = Math.max(text.length, 1)
          const delay = elapsed
          elapsed += chars * SPEED + 0.07
          const last = i === LINES.length - 1

          return (
            <span className="console__line" key={i}>
              <span className="console__ln">{i + 1}</span>
              <span
                className="console__code"
                style={{
                  width: `${chars}ch`,
                  animationDuration: `${chars * SPEED}s`,
                  animationDelay: `${delay}s`,
                  ['--chars' as string]: chars,
                }}
              >
                {tokens.map((tk, j) => (
                  <Fragment key={j}>{tk.c ? <span className={tk.c}>{tk.t}</span> : tk.t}</Fragment>
                ))}
              </span>
              {last ? <span className="caret" /> : null}
            </span>
          )
        })}
      </div>
    </div>
  )
}
