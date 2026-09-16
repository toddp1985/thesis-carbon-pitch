import { Figure } from '../Figure'
import { formatUsd } from '../../lib/math'

type Props = {
  bufferPct: number
  trappedUsd: number
}

export function BufferInventory({ bufferPct, trappedUsd }: Props) {
  const locked = Math.max(1, Math.round(bufferPct))
  const cells = Array.from({ length: 100 }, (_, i) => i < locked)

  return (
    <Figure
      caption={`Each square is 1% of a vintage. Gold squares are buffer credits — not VCUs, not tradable, marked at zero to the developer. At this setting, ${bufferPct.toFixed(1)}% is dead capital (${formatUsd(trappedUsd)} per year).`}
    >
      <div className="flex h-full flex-col justify-center gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
              100% of issuance
            </p>
            <p className="font-serif text-3xl text-paper">{bufferPct.toFixed(1)}% trapped</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
              Dead capital / yr
            </p>
            <p className="font-serif text-3xl text-risk">{formatUsd(trappedUsd)}</p>
          </div>
        </div>
        <div
          className="grid aspect-square max-h-[min(52vh,420px)] w-full grid-cols-10 gap-1"
          role="img"
          aria-label={`${locked} of 100 percent of the vintage locked in the buffer`}
        >
          {cells.map((isLocked, i) => (
            <div
              key={i}
              className={
                isLocked
                  ? 'rounded-[2px] bg-gold/80 shadow-[inset_0_0_0_1px_rgba(138,115,73,0.8)]'
                  : 'rounded-[2px] bg-liquid/35'
              }
            />
          ))}
        </div>
        <div className="flex gap-4 font-mono text-[10px] uppercase tracking-[0.12em]">
          <span className="flex items-center gap-1.5 text-liquid">
            <i className="inline-block h-2.5 w-2.5 rounded-[2px] bg-liquid/50" />
            Free capital · sellable VCUs
          </span>
          <span className="flex items-center gap-1.5 text-gold">
            <i className="inline-block h-2.5 w-2.5 rounded-[2px] bg-gold/80" />
            Buffer · not a VCU
          </span>
        </div>
      </div>
    </Figure>
  )
}
