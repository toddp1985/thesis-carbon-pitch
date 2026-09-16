type Props = {
  tone?: 'illustrative' | 'verified' | 'third-party'
  children?: string
}

const LABEL = {
  illustrative: 'Illustrative',
  verified: 'Verified — primary source',
  'third-party': 'Third-party snapshot',
} as const

export function IllustrativeBadge({ tone = 'illustrative', children }: Props) {
  const palette =
    tone === 'verified'
      ? 'border-liquid/40 text-liquid'
      : tone === 'third-party'
        ? 'border-gold/40 text-gold'
        : 'border-risk/50 text-risk'
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${palette}`}
    >
      {children ?? LABEL[tone]}
    </span>
  )
}
