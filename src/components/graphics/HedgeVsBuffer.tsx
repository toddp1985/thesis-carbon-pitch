import { Figure } from '../Figure'
import { computeCase, formatUsd, type CalculatorInputs } from '../../lib/math'

type Props = {
  inputs: CalculatorInputs
}

export function HedgeVsBuffer({ inputs }: Props) {
  const result = computeCase(inputs)
  const bufferH = Math.max(8, inputs.bufferPct * 2.4)
  const premiumH = Math.max(6, inputs.premiumPct * 2.4)

  return (
    <Figure caption="Same vintage, two uses of cash. The buffer withholds inventory at issuance. Thesis takes a cash premium and — if the registry accepts the hedge — the developer sells the whole vintage. Working capital is the gap.">
      <div className="flex h-full flex-col justify-center gap-5">
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          <Column
            kicker="Buffer path"
            title="Inventory tax"
            tone="risk"
            fillPct={bufferH}
            fillLabel={`${inputs.bufferPct.toFixed(1)}% trapped`}
            top={formatUsd(result.trappedPerYear)}
            topHint="dead capital / yr"
            bottom={formatUsd(result.cashBufferAnnual)}
            bottomHint="cash after skim"
          />
          <Column
            kicker="Thesis path"
            title="Cash premium"
            tone="liquid"
            fillPct={premiumH}
            fillLabel={`${inputs.premiumPct.toFixed(1)}% premium`}
            top={formatUsd(result.premiumPerYear)}
            topHint="cash cost / yr"
            bottom={formatUsd(result.cashHedgeAnnual)}
            bottomHint="cash after premium"
          />
        </div>
        <div className="rounded-sm border border-liquid/30 bg-liquid/8 px-3 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-liquid">
            Working capital freed, year 1
          </p>
          <p className="font-serif text-3xl text-paper">{formatUsd(result.workingCapitalFreed)}</p>
          <p className="mt-1 text-[12px] text-mute">
            Inventory the developer can sell, finance, or recycle instead of depositing. NPV over{' '}
            {inputs.years} years: {formatUsd(result.npvDelta)} advantage on the hedge path
            (illustrative).
          </p>
        </div>
      </div>
    </Figure>
  )
}

function Column({
  kicker,
  title,
  tone,
  fillPct,
  fillLabel,
  top,
  topHint,
  bottom,
  bottomHint,
}: {
  kicker: string
  title: string
  tone: 'risk' | 'liquid'
  fillPct: number
  fillLabel: string
  top: string
  topHint: string
  bottom: string
  bottomHint: string
}) {
  const fill = tone === 'risk' ? 'bg-gold' : 'bg-gold-2'
  const free = tone === 'risk' ? 'bg-ink-3' : 'bg-liquid/35'
  const label = tone === 'risk' ? 'text-risk' : 'text-liquid'

  return (
    <div className="rounded-sm border border-line bg-ink/60 p-3">
      <p className={`font-mono text-[10px] uppercase tracking-[0.14em] ${label}`}>{kicker}</p>
      <p className="font-serif text-xl text-paper">{title}</p>
      <div className="mt-3 flex h-40 flex-col overflow-hidden rounded-sm border border-line">
        <div
          className={`${fill} flex items-center justify-center px-2 text-center font-mono text-[9px] uppercase tracking-[0.1em] text-ink`}
          style={{ height: `${Math.min(fillPct, 55)}%` }}
        >
          {fillLabel}
        </div>
        <div className={`${free} flex flex-1 items-center justify-center px-2 text-center font-mono text-[9px] uppercase tracking-[0.1em] text-paper-dim`}>
          sellable cash
        </div>
      </div>
      <p className={`mt-3 font-serif text-2xl ${label}`}>{top}</p>
      <p className="font-mono text-[10px] text-mute">{topHint}</p>
      <p className="mt-2 font-serif text-xl text-paper">{bottom}</p>
      <p className="font-mono text-[10px] text-mute">{bottomHint}</p>
    </div>
  )
}
