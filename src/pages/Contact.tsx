import { useState, type FormEvent } from 'react'
import { IconArrow, IconCheck } from '../components/Icons'
import { Panel, PageHero } from '../components/Ui'
import { COMPANY, SERVICES } from '../lib/content'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Optional POST target. Without it the form composes an email instead. */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

const BUDGETS = ['Under €50k', '€50k – €150k', '€150k – €500k', '€500k+', 'Not sure yet']

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    const next: Errors = {}
    if (!data.name?.trim()) next.name = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email ?? '')) next.email = 'Enter a valid email address'
    if ((data.message ?? '').trim().length < 20) next.message = 'A little more detail, please (20+ characters)'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('sending')

    if (ENDPOINT) {
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error(String(res.status))
        setStatus('sent')
        form.reset()
      } catch {
        setStatus('error')
      }
      return
    }

    // No endpoint configured: hand the message to the visitor's mail client.
    const subject = `Project enquiry — ${data.name}${data.company ? ` (${data.company})` : ''}`
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company ? `Company: ${data.company}` : '',
      data.service ? `Service: ${data.service}` : '',
      data.budget ? `Budget: ${data.budget}` : '',
      '',
      data.message,
    ]
      .filter(Boolean)
      .join('\n')

    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setStatus('sent')
    form.reset()
  }

  return (
    <div className="page">
      <PageHero
        tag="Contact"
        title={
          <>
            Start with the <span className="gradient-text">hard question</span>
          </>
        }
        text="Tell us the constraint, the deadline or the system nobody wants to touch. You will get an answer from an engineer within one working day."
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell contact-grid">
          {status === 'sent' ? (
            <Panel className="form__success reveal">
              <span className="form__check">
                <IconCheck />
              </span>
              <h2 className="h-lg">Message on its way</h2>
              <p className="lede" style={{ textAlign: 'center' }}>
                {ENDPOINT
                  ? 'Thanks — we have it. Expect a reply from one of our engineers within one working day.'
                  : `Your mail client should have opened with the message ready to send to ${COMPANY.email}. If it did not, write to us directly.`}
              </p>
              <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>
                Send another
              </button>
            </Panel>
          ) : (
            <Panel className="form reveal" spotlight={false}>
              <form onSubmit={onSubmit} noValidate className="stack" style={{ gap: '1.15rem' }}>
                <div className="form__row">
                  <div className={`field${errors.name ? ' field--error' : ''}`}>
                    <label className="field__label" htmlFor="name">
                      Your name *
                    </label>
                    <input id="name" name="name" placeholder="Jane Webster" autoComplete="name" />
                    {errors.name ? <span className="field__error">{errors.name}</span> : null}
                  </div>
                  <div className={`field${errors.email ? ' field--error' : ''}`}>
                    <label className="field__label" htmlFor="email">
                      Work email *
                    </label>
                    <input id="email" name="email" type="email" placeholder="jane@company.com" autoComplete="email" />
                    {errors.email ? <span className="field__error">{errors.email}</span> : null}
                  </div>
                </div>

                <div className="form__row">
                  <div className="field">
                    <label className="field__label" htmlFor="company">
                      Company
                    </label>
                    <input id="company" name="company" placeholder="Acme Industries" autoComplete="organization" />
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="service">
                      What do you need?
                    </label>
                    <select id="service" name="service" defaultValue={SERVICES[0].title}>
                      {SERVICES.map((s) => (
                        <option key={s.slug}>{s.title}</option>
                      ))}
                      <option>Something else</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="budget">
                    Indicative budget
                  </label>
                  <select id="budget" name="budget" defaultValue={BUDGETS[4]}>
                    {BUDGETS.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div className={`field${errors.message ? ' field--error' : ''}`}>
                  <label className="field__label" htmlFor="message">
                    The brief *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="We run AEM 6.5 on-prem across nine markets and need to be on Cloud Service before our licence renews…"
                  />
                  {errors.message ? <span className="field__error">{errors.message}</span> : null}
                </div>

                {status === 'error' ? (
                  <p className="field__error">
                    Something went wrong sending that. Please email {COMPANY.email} directly.
                  </p>
                ) : null}

                <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                  <IconArrow className="btn__arrow" />
                </button>

                <p className="muted" style={{ fontSize: '0.78rem' }}>
                  We use what you send only to answer you. No lists, no sequences, no resale.
                </p>
              </form>
            </Panel>
          )}

          <div className="reveal" data-delay="120">
            <h2 className="h-md" style={{ marginBottom: '0.5rem' }}>
              Or reach us directly
            </h2>
            <div className="stack">
              <div className="contact-item">
                <span className="contact-item__k">Contact</span>
                <a className="contact-item__v" href={`mailto:${COMPANY.email}`}>
                  {COMPANY.email}
                </a>
              </div>
              {COMPANY.careers != '' &&
              <div className="contact-item">
                <span className="contact-item__k">Careers</span>
                <a className="contact-item__v" href={`mailto:${COMPANY.careers}`}>
                  {COMPANY.careers}
                </a>
              </div>
              }
              {COMPANY.phone != '' &&
              <div className="contact-item">
                <span className="contact-item__k">Phone</span>
                <a className="contact-item__v" href={`tel:${COMPANY.phone}`}>
                  {COMPANY.phone}
                </a>
              </div>
              }
              {COMPANY.address != '' &&
              <div className="contact-item">
                <span className="contact-item__k">Studio</span>
                <span className="contact-item__v">{COMPANY.address}</span>
              </div>
              }
              <div className="contact-item" style={{ borderBottom: 'none' }}>
                <span className="contact-item__k">Response time</span>
                <span className="contact-item__v">One working day, from an engineer</span>
              </div>
            </div>

            <Panel style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
              <span className="chip chip--live">
                <span className="pulse-dot" />
                Capacity
              </span>
              <p className="muted" style={{ fontSize: '0.92rem', marginTop: '1rem' }}>
                Two delivery teams free from Q2 2027. Discovery sprints can usually start within three
                weeks of a signed scope.
              </p>
            </Panel>
          </div>
        </div>
      </section>
    </div>
  )
}
