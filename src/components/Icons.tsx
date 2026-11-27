type P = { className?: string; size?: number }

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export const IconArrow = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const IconBrowser = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden="true">
    <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
    <path d="M2.5 9h19M6 6.5h.01M9 6.5h.01" />
    <path d="M7 13.5l2 2.5-2 2.5M11.5 18.5h5" />
  </svg>
)

export const IconLayers = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden="true">
    <path d="M12 2.5 2.5 7.5 12 12.5l9.5-5L12 2.5Z" />
    <path d="M2.5 12.5 12 17.5l9.5-5M2.5 17l9.5 5 9.5-5" />
  </svg>
)

export const IconCube = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden="true">
    <path d="M21 7.5 12 2.5 3 7.5v9l9 5 9-5v-9Z" />
    <path d="m3 7.5 9 5 9-5M12 12.5v9" />
  </svg>
)

export const IconSpark = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden="true">
    <path d="M12 2.5v5M12 16.5v5M2.5 12h5M16.5 12h5M5.5 5.5l3 3M15.5 15.5l3 3M18.5 5.5l-3 3M8.5 15.5l-3 3" />
  </svg>
)

export const IconShield = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden="true">
    <path d="M12 2.5 4 6v6c0 5 3.4 8.2 8 9.5 4.6-1.3 8-4.5 8-9.5V6l-8-3.5Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </svg>
)

export const IconGauge = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden="true">
    <path d="M4 18a9 9 0 1 1 16 0" />
    <path d="m12 14 4-4" />
    <circle cx="12" cy="15" r="1.6" />
  </svg>
)

export const IconCheck = ({ size = 26, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
)

export const IconMail = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className} aria-hidden="true">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

export const Logo = ({ size = 32, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="xo-logo" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#00e5ff" />
        <stop offset="0.5" stopColor="#7b5cff" />
        <stop offset="1" stopColor="#ff2fb9" />
      </linearGradient>
    </defs>
    <path
      d="M14 14 50 50 M50 14 14 50"
      stroke="url(#xo-logo)"
      strokeWidth="7"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="32" cy="32" r="6.5" fill="#04050a" />
    <circle cx="32" cy="32" r="3.2" fill="#00e5ff" />
  </svg>
)
