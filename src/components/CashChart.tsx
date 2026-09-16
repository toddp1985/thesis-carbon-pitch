import type { YearPoint } from '../lib/math'
import { formatUsd } from '../lib/math'

type Props = {
  series: YearPoint[]
}

export function CashChart({ series }: Props) {
  const w = 640
  const h = 220
  const pad = { l: 12, r: 16, t: 22, b: 28 }
  const max = Math.max(...series.map((p) => Math.max(p.bufferCum, p.hedgeCum)), 1)
  const x = (i: number) => pad.l + (i / Math.max(series.length - 1, 1)) * (w - pad.l - pad.r)
  const y = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b)
  const line = (key: 'bufferCum' | 'hedgeCum') =>
    series
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(p[key]).toFixed(1)}`)
      .join(' ')
  const area = (key: 'bufferCum' | 'hedgeCum') => {
    const head = line(key)
    const lastX = x(series.length - 1)
    return `${head} L ${lastX.toFixed(1)} ${y(0).toFixed(1)} L ${x(0).toFixed(1)} ${y(0).toFixed(1)} Z`
  }
  const last = series[series.length - 1]

  return (
    <div className="mt-5 rounded-sm border border-line bg-ink/50 p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
        <span>Cumulative developer cash · hedge stays above the buffer path</span>
        <span className="flex gap-3">
          <span className="text-gold-2">Buffer path</span>
          <span className="text-liquid">Thesis hedge</span>
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-48 w-full" role="img" aria-label="Cumulative cash comparison">
        <path d={area('hedgeCum')} fill="#6b9e8a" opacity="0.16" />
        <path d={area('bufferCum')} fill="#8a7349" opacity="0.14" />
        <path d={line('bufferCum')} fill="none" stroke="#8a7349" strokeWidth="1.8" />
        <path d={line('hedgeCum')} fill="none" stroke="#6b9e8a" strokeWidth="2.2" />
        {last && (
          <>
            <text x={x(series.length - 1) - 2} y={y(last.bufferCum) - 8} fill="#8a7349" fontSize="11" textAnchor="end">
              {formatUsd(last.bufferCum)}
            </text>
            <text x={x(series.length - 1) - 2} y={y(last.hedgeCum) - 8} fill="#6b9e8a" fontSize="11" textAnchor="end">
              {formatUsd(last.hedgeCum)}
            </text>
          </>
        )}
        {series
          .filter((_, i) => i === 0 || i === series.length - 1 || (i + 1) % 2 === 0)
          .map((p) => (
            <text key={p.year} x={x(p.year - 1)} y={h - 6} fill="#8d8678" fontSize="10" textAnchor="middle">
              Y{p.year}
            </text>
          ))}
      </svg>
    </div>
  )
}
