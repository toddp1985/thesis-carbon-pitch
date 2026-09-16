import type { YearPoint } from '../lib/math'
import { formatUsd } from '../lib/math'

type Props = {
  series: YearPoint[]
}

export function CashChart({ series }: Props) {
  const w = 560
  const h = 180
  const pad = { l: 8, r: 8, t: 16, b: 24 }
  const max = Math.max(...series.map((p) => Math.max(p.bufferCum, p.hedgeCum)), 1)
  const x = (i: number) =>
    pad.l + (i / Math.max(series.length - 1, 1)) * (w - pad.l - pad.r)
  const y = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b)
  const path = (key: 'bufferCum' | 'hedgeCum') =>
    series
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(p[key]).toFixed(1)}`)
      .join(' ')
  const last = series[series.length - 1]

  return (
    <div className="mt-5 rounded-sm border border-line bg-ink-2/70 p-3">
      <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
        <span>Cumulative developer cash</span>
        <span className="flex gap-3">
          <span className="text-gold-2">Buffer path</span>
          <span className="text-liquid">Thesis hedge</span>
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-40 w-full" role="img" aria-label="Cumulative cash comparison">
        <path d={path('bufferCum')} fill="none" stroke="#8a7349" strokeWidth="1.6" />
        <path d={path('hedgeCum')} fill="none" stroke="#6b9e8a" strokeWidth="2" />
        {last && (
          <>
            <text x={x(series.length - 1) - 4} y={y(last.bufferCum) - 6} fill="#8a7349" fontSize="10" textAnchor="end">
              {formatUsd(last.bufferCum)}
            </text>
            <text x={x(series.length - 1) - 4} y={y(last.hedgeCum) - 6} fill="#6b9e8a" fontSize="10" textAnchor="end">
              {formatUsd(last.hedgeCum)}
            </text>
          </>
        )}
        {series
          .filter((_, i) => i === 0 || i === series.length - 1 || (i + 1) % 2 === 0)
          .map((p) => (
            <text key={p.year} x={x(p.year - 1)} y={h - 4} fill="#8d8678" fontSize="9" textAnchor="middle">
              Y{p.year}
            </text>
          ))}
      </svg>
    </div>
  )
}
