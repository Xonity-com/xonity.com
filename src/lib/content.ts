import type { ComponentType } from 'react'
import { IconBrowser, IconCube, IconGauge, IconLayers, IconShield, IconSpark } from '../components/Icons'

export type IconCmp = ComponentType<{ size?: number; className?: string }>

export const COMPANY = {
  name: 'Xonity',
  tagline: 'Digital engineering for the next decade',
  careers: '',
  phone: '',
  address: '',
  email: 'hello@xonity.com',
  founded: 2014,
} as const

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

export type Service = {
  slug: string
  index: string
  /** Short label used in links, e.g. "Explore {short}". */
  short: string
  /** Noun phrase for CTA copy, e.g. "Discuss {cta}". */
  cta: string
  icon: IconCmp
  title: string
  summary: string
  blurb: string
  points: string[]
  stack: string[]
}

export const SERVICES: Service[] = [
  {
    slug: 'websites',
    index: '01',
    short: 'web experiences',
    cta: 'a website build',
    icon: IconBrowser,
    title: 'Websites & Digital Experiences',
    summary:
      'Marketing sites, portals and commerce front-ends that load in under a second and convert on every device.',
    blurb:
      'We design and build front-ends the way product teams build software: typed, tested, observable and shipped continuously. Every interface starts from a design system, renders at the edge and is measured against real-user Core Web Vitals rather than lab scores.',
    points: [
      'Design systems and component libraries built to survive rebrands',
      'Server-side rendering and edge delivery for sub-second first paint',
      'Headless CMS integration — authors ship content without a developer',
      'WCAG 2.2 AA accessibility baked into the component layer',
      'Analytics, consent management and experimentation wired from day one',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Astro', 'Tailwind', 'Vite', 'GraphQL', 'Storybook'],
  },
  {
    slug: 'enterprise',
    index: '02',
    short: 'enterprise builds',
    cta: 'an enterprise platform',
    icon: IconCube,
    title: 'Enterprise Applications',
    summary:
      'Mission-critical platforms, integrations and internal tooling engineered for scale, audit and the long haul.',
    blurb:
      'When a system carries payroll, logistics or regulated data, correctness beats novelty. We modernise legacy estates incrementally — strangler-fig migrations, event-driven integration and domain-driven boundaries — so the business keeps running while the architecture changes underneath it.',
    points: [
      'Domain-driven service architecture with clear, testable boundaries',
      'Legacy modernisation without a big-bang cutover',
      'Event-driven integration across ERP, CRM and billing systems',
      'Zero-trust security, SSO and fine-grained authorisation',
      'Observability, SLOs and incident tooling handed over with the code',
    ],
    stack: ['Java', 'Spring Boot', 'Node.js', 'PostgreSQL', 'Kafka', 'Kubernetes', 'Terraform', 'AWS'],
  },
  {
    slug: 'aem',
    index: '03',
    short: 'the AEM practice',
    cta: 'an AEM engagement',
    icon: IconLayers,
    title: 'Adobe Experience Manager',
    summary:
      'AEM Sites, Assets and Cloud Service — architected, migrated and operated by certified specialists.',
    blurb:
      'AEM rewards teams who respect its grain. We build on core components, keep customisation in the editable-template layer and ship through Cloud Manager quality gates — so your authors get speed, and your platform stays upgradeable instead of frozen on a fork.',
    points: [
      'AEM as a Cloud Service migrations from 6.x, on-prem or AMS',
      'Core components, editable templates and reusable content fragments',
      'Headless delivery via GraphQL content fragments and SPA Editor',
      'Dispatcher, CDN and caching strategy tuned for traffic peaks',
      'Author enablement, governance and Cloud Manager CI/CD pipelines',
    ],
    stack: ['AEM Cloud Service', 'Sling', 'OSGi', 'HTL', 'Dispatcher', 'Cloud Manager', 'Adobe Assets', 'Edge Delivery'],
  },
]

export type Capability = { icon: IconCmp; title: string; text: string }

export const CAPABILITIES: Capability[] = [
  {
    icon: IconGauge,
    title: 'Performance as a contract',
    text: 'Budgets are agreed up front and enforced in CI. A pull request that regresses Core Web Vitals does not merge.',
  },
  {
    icon: IconShield,
    title: 'Security and compliance',
    text: 'Threat modelling, dependency scanning and penetration-test remediation on every engagement — GDPR and NIS2 aware.',
  },
  {
    icon: IconSpark,
    title: 'Pragmatic AI',
    text: 'Retrieval, search and content assistance where they measurably help authors and customers. No demos pretending to be products.',
  },
]

export type Step = { n: string; title: string; text: string }

export const PROCESS: Step[] = [
  {
    n: '01',
    title: 'Discover',
    text: 'Two weeks inside your domain: stakeholders, constraints, telemetry and the real cost of the current system.',
  },
  {
    n: '02',
    title: 'Architect',
    text: 'A decision record for every choice that is hard to reverse, plus a delivery plan you could hand to another team.',
  },
  {
    n: '03',
    title: 'Build',
    text: 'Two-week increments, trunk-based, behind feature flags. Working software in your environment from sprint one.',
  },
  {
    n: '04',
    title: 'Operate',
    text: 'SLOs, dashboards and runbooks. We stay on call through hypercare, then hand over to a team we have trained.',
  },
]

export type CaseStudy = {
  id: string
  sector: string
  category: 'Websites' | 'Enterprise' | 'AEM'
  title: string
  text: string
  metrics: { value: string; label: string }[]
  tags: string[]
  hue: string
}

export const WORK: CaseStudy[] = [
  {
    id: 'nordbank',
    sector: 'Financial services',
    category: 'Enterprise',
    title: 'Core banking portal, rebuilt mid-flight',
    text: 'A twelve-year-old servlet estate serving 2.4M retail customers, migrated service by service to an event-driven platform with no customer-facing downtime.',
    metrics: [
      { value: '−68%', label: 'p95 latency' },
      { value: '0', label: 'cutover outages' },
      { value: '14mo', label: 'to full migration' },
    ],
    tags: ['Spring Boot', 'Kafka', 'Kubernetes', 'OAuth2'],
    hue: 'rgba(0,229,255,.5)',
  },
  {
    id: 'helvara',
    sector: 'Industrial manufacturing',
    category: 'AEM',
    title: 'Forty markets on one AEM Cloud platform',
    text: 'Consolidated 40 country sites from three legacy CMS platforms into AEM as a Cloud Service with a shared core-component library and localised editorial governance.',
    metrics: [
      { value: '40', label: 'markets live' },
      { value: '−81%', label: 'time to publish' },
      { value: '3x', label: 'author throughput' },
    ],
    tags: ['AEM Cloud', 'Content Fragments', 'Dispatcher', 'Launches'],
    hue: 'rgba(255,47,185,.5)',
  },
  {
    id: 'atlasmed',
    sector: 'Healthcare',
    category: 'Websites',
    title: 'A patient portal that passes an audit',
    text: 'Accessible, multilingual patient experience with appointment booking, records access and a design system now used across the client’s whole digital estate.',
    metrics: [
      { value: '100', label: 'Lighthouse a11y' },
      { value: '0.4s', label: 'LCP at p75' },
      { value: '+37%', label: 'self-service rate' },
    ],
    tags: ['Next.js', 'TypeScript', 'WCAG 2.2', 'FHIR'],
    hue: 'rgba(123,92,255,.5)',
  },
  {
    id: 'volterra',
    sector: 'Energy',
    category: 'Enterprise',
    title: 'Grid telemetry at a million events a minute',
    text: 'Streaming ingestion, anomaly detection and an operator console that turned a nightly batch report into a live operational picture.',
    metrics: [
      { value: '1.2M', label: 'events / min' },
      { value: '99.98%', label: 'availability' },
      { value: '−42%', label: 'cloud spend' },
    ],
    tags: ['Flink', 'TimescaleDB', 'React', 'Terraform'],
    hue: 'rgba(114,255,182,.45)',
  },
  {
    id: 'lumen-retail',
    sector: 'Retail',
    category: 'AEM',
    title: 'Headless AEM behind a commerce front-end',
    text: 'Content fragments delivered over GraphQL into a Next.js storefront, with authors previewing live personalisation without touching the front-end repo.',
    metrics: [
      { value: '−55%', label: 'page weight' },
      { value: '+22%', label: 'conversion' },
      { value: '6wk', label: 'to first market' },
    ],
    tags: ['AEM Headless', 'GraphQL', 'Next.js', 'Edge Cache'],
    hue: 'rgba(255,179,71,.45)',
  },
  {
    id: 'civitas',
    sector: 'Public sector',
    category: 'Websites',
    title: 'One design system, 60 municipal services',
    text: 'A government service kit — components, patterns and accessibility tests — adopted by sixty teams and governed by a contribution model that actually gets used.',
    metrics: [
      { value: '60', label: 'services onboarded' },
      { value: '−70%', label: 'build time per service' },
      { value: 'AA', label: 'WCAG conformance' },
    ],
    tags: ['Design System', 'Astro', 'Storybook', 'Axe CI'],
    hue: 'rgba(0,229,255,.4)',
  },
]

export const VALUES = [
  {
    k: '01',
    title: 'Engineers in the room',
    text: 'The people who scope your work are the people who build it. No account layer translating between you and the keyboard.',
  },
  {
    k: '02',
    title: 'Boring where it counts',
    text: 'We will use the exciting technology when it earns its place, and the proven one everywhere else. Your platform is not a laboratory.',
  },
  {
    k: '03',
    title: 'Written decisions',
    text: 'Every architectural choice ships with the reasoning behind it. Two years on, your team can still tell why the system looks like this.',
  },
  {
    k: '04',
    title: 'Handover is the deliverable',
    text: 'Success is your team running the platform confidently without us. We write the runbooks and train the people who inherit them.',
  },
]

export type Stat = { value: number; suffix: string; label: string; decimals?: number }

export const STATS: Stat[] = [
  { value: 11, suffix: '+', label: 'Years shipping' },
  { value: 140, suffix: '+', label: 'Platforms delivered' },
  { value: 99.98, suffix: '%', label: 'Uptime across managed estates', decimals: 2 },
]

export const MARQUEE = [
  'React',
  'Next.js',
  'TypeScript',
  'Adobe Experience Manager',
  'Java / Spring',
  'Node.js',
  'Kubernetes',
  'Kafka',
  'PostgreSQL',
  'AWS',
  'Terraform',
  'GraphQL',
  'Edge Delivery Services',
  'Design Systems',
]

export const ENGAGEMENTS = [
  {
    title: 'Discovery sprint',
    price: '2–4 weeks',
    text: 'A fixed-scope investigation that ends with an architecture, a delivery plan and a defensible cost range.',
    items: ['Stakeholder and system audit', 'Target architecture', 'Risk register', 'Costed roadmap'],
  },
  {
    title: 'Delivery team',
    price: 'Ongoing',
    text: 'A cross-functional squad embedded with your people, shipping to production every two weeks.',
    items: ['Tech lead, engineers, QA, design', 'Trunk-based delivery', 'Shared backlog and metrics', 'Monthly steering'],
  },
  {
    title: 'Platform care',
    price: 'Retainer',
    text: 'We keep what we built — or what you inherited — patched, observed and within its performance budget.',
    items: ['24/7 on-call option', 'SLOs and monthly reporting', 'Upgrade and patch cadence', 'Continuous improvement budget'],
  },
]
