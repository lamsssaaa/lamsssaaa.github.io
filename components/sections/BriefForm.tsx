'use client'

import { useState } from 'react'
import type { Lang } from '../../lib/i18n'
import { briefHeading, contact } from '../../data/content'
import styles from './BriefForm.module.css'

/**
 * Section 08 — Project brief form.
 *
 * A clean, on-brand project-brief form with no backend: on submit it assembles
 * a `mailto:` link to `contact.email` (subject + body built from the fields)
 * and opens the visitor's email client. Trilingual copy (fr/en) is centralised
 * in the COPY object below.
 */

type BudgetValue = 'sub5k' | '5to15k' | '15to50k' | 'over50k' | 'undecided'

interface FieldCopy {
  label: string
  placeholder?: string
}

const COPY: Record<
  Lang,
  {
    name: FieldCopy
    email: FieldCopy
    company: FieldCopy
    budget: { label: string; options: Record<BudgetValue, string> }
    description: FieldCopy
    submit: string
    sending: string
    success: string
    optional: string
    mailIntro: string
  }
> = {
  fr: {
    name: { label: 'Nom', placeholder: 'Votre nom' },
    email: { label: 'E-mail', placeholder: 'vous@exemple.com' },
    company: { label: 'Entreprise', placeholder: 'Nom de votre marque' },
    budget: {
      label: 'Budget',
      options: {
        sub5k: 'Moins de 5 000 CHF',
        '5to15k': '5 000 – 15 000 CHF',
        '15to50k': '15 000 – 50 000 CHF',
        over50k: 'Plus de 50 000 CHF',
        undecided: 'À définir',
      },
    },
    description: {
      label: 'Votre projet',
      placeholder: 'Décrivez votre projet, vos objectifs et vos délais.',
    },
    submit: 'Envoyer le brief',
    sending: 'Envoi…',
    success: 'Merci, votre messagerie va s’ouvrir.',
    optional: 'Optionnel',
    mailIntro: 'Nouveau brief de projet',
  },
  en: {
    name: { label: 'Name', placeholder: 'Your name' },
    email: { label: 'Email', placeholder: 'you@example.com' },
    company: { label: 'Company', placeholder: 'Your brand name' },
    budget: {
      label: 'Budget',
      options: {
        sub5k: 'Under CHF 5,000',
        '5to15k': 'CHF 5,000 – 15,000',
        '15to50k': 'CHF 15,000 – 50,000',
        over50k: 'Over CHF 50,000',
        undecided: 'To be defined',
      },
    },
    description: {
      label: 'Your project',
      placeholder: 'Describe your project, your goals and your timeline.',
    },
    submit: 'Send brief',
    sending: 'Sending…',
    success: 'Thanks — your email app will open.',
    optional: 'Optional',
    mailIntro: 'New project brief',
  },
}

const BUDGET_VALUES: BudgetValue[] = ['sub5k', '5to15k', '15to50k', 'over50k', 'undecided']

export function BriefForm({ lang }: { lang: Lang }) {
  const t = COPY[lang]

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [budget, setBudget] = useState<BudgetValue>('undecided')
  const [description, setDescription] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim() || !email.trim() || !description.trim()) return

    setSending(true)

    const subject = `${t.mailIntro} — ${name.trim()}`
    const bodyLines = [
      `${t.name.label}: ${name.trim()}`,
      `${t.email.label}: ${email.trim()}`,
      `${t.company.label}: ${company.trim() || '—'}`,
      `${t.budget.label}: ${t.budget.options[budget]}`,
      '',
      `${t.description.label}:`,
      description.trim(),
    ]

    const mailtoUrl =
      `mailto:${contact.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(bodyLines.join('\n'))}`

    setSent(true)
    window.location.href = mailtoUrl
    setSending(false)
  }

  return (
    <section id="brief" className="section">
      <div className="container">
        <span className="section-index">08 — {briefHeading[lang]}</span>
        <h2 className="section-title">{briefHeading[lang]}</h2>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="brief-name">
                {t.name.label}
              </label>
              <input
                id="brief-name"
                className={styles.input}
                type="text"
                name="name"
                autoComplete="name"
                required
                placeholder={t.name.placeholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="brief-email">
                {t.email.label}
              </label>
              <input
                id="brief-email"
                className={styles.input}
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder={t.email.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="brief-company">
                {t.company.label} <span className={styles.optional}>· {t.optional}</span>
              </label>
              <input
                id="brief-company"
                className={styles.input}
                type="text"
                name="company"
                autoComplete="organization"
                placeholder={t.company.placeholder}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="brief-budget">
                {t.budget.label}
              </label>
              <select
                id="brief-budget"
                className={styles.select}
                name="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value as BudgetValue)}
              >
                {BUDGET_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {t.budget.options[value]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="brief-description">
              {t.description.label}
            </label>
            <textarea
              id="brief-description"
              className={styles.textarea}
              name="description"
              required
              rows={6}
              placeholder={t.description.placeholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.actions}>
            <button className={styles.submit} type="submit" disabled={sending}>
              {sending ? t.sending : t.submit}
            </button>
            {sent && (
              <p className={styles.success} role="status" aria-live="polite">
                {t.success}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
