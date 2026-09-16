import { useMemo } from 'react'
import { computeCase, formatTonnes, formatUsd, type CalculatorInputs } from '../lib/math'
import { CashChart } from './CashChart'
import { IllustrativeBadge } from './IllustrativeBadge'

type Props = {
  value: CalculatorInputs
  onChange: (next: CalculatorInputs) => void
}

function SliderRow({
  label,
  hint,
  min,
  max,
  step,
  value,
  display,
  onChange,
}: {
  label: string
  hint?: string
  min: number
  max: number
  step: number
  value: number
  display: string
  onChange: (n: number) => void
}) {
  return (
    <label className="grid gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] text-paper-dim">
          {label}
          {hint && <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-mute">{hint}</span>}
        </span>
        <span className="font-mono text-[12px] text-gold">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink-3 accent-gold"
      />
    </label>
  )
}

export function Calculator({ value, onChange }: Props) {
  const result = useMemo(() => computeCase(value), [value])
  const patch = (partial: Partial<CalculatorInputs>) => onChange({ ...value, ...partial })

  return (
    <div className="mt-6 rounded-sm border border-line bg-ink-2/80 p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <h3 className="font-serif text-2xl text-paper">Buffer % vs hedge premium</h3>
        <IllustrativeBadge>Illustrative model</IllustrativeBadge>
      </div>
      <p className="mb-5 text-[13px] leading-relaxed text-mute">
        NPV is an ordinary annuity of annual developer cash, discounted at the rate below. Buffer
        credits are treated as unsold (and, per Verra FAQ, canceled at last crediting period) — no
        terminal recovery. Desk margin is capital posted by the market-maker, not a developer
        expense.
      </p>

      <div className="grid gap-4">
        <SliderRow
          label="Credit price"
          hint="$ / tCO₂e"
          min={3}
          max={22}
          step={0.5}
          value={value.price}
          display={`$${value.price.toFixed(1)}`}
          onChange={(price) => patch({ price })}
        />
        <SliderRow
          label="Annual issuance"
          hint="tCO₂e / yr"
          min={40_000}
          max={200_000}
          step={5_000}
          value={value.annualIssuance}
          display={formatTonnes(value.annualIssuance)}
          onChange={(annualIssuance) => patch({ annualIssuance })}
        />
        <SliderRow
          label="Registry buffer"
          hint="% trapped"
          min={10}
          max={30}
          step={0.5}
          value={value.bufferPct}
          display={`${value.bufferPct.toFixed(1)}%`}
          onChange={(bufferPct) => patch({ bufferPct })}
        />
        <SliderRow
          label="Thesis premium"
          hint="% of asset value / yr"
          min={1.5}
          max={8}
          step={0.1}
          value={value.premiumPct}
          display={`${value.premiumPct.toFixed(1)}%`}
          onChange={(premiumPct) => patch({ premiumPct })}
        />
        <SliderRow
          label="Horizon"
          hint="years"
          min={5}
          max={20}
          step={1}
          value={value.years}
          display={`${value.years} yrs`}
          onChange={(years) => patch({ years })}
        />
        <SliderRow
          label="Discount rate"
          hint="developer WACC"
          min={6}
          max={16}
          step={0.5}
          value={value.discountPct}
          display={`${value.discountPct.toFixed(1)}%`}
          onChange={(discountPct) => patch({ discountPct })}
        />
        <SliderRow
          label="Desk initial margin"
          hint="SIG-style, on annual notional"
          min={10}
          max={40}
          step={1}
          value={value.marginPct}
          display={`${value.marginPct.toFixed(0)}%`}
          onChange={(marginPct) => patch({ marginPct })}
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
        <Stat label="Gross vintage" value={formatUsd(result.grossAnnual)} hint="/ year" />
        <Stat label="Trapped at issuance" value={formatUsd(result.trappedPerYear)} hint="buffer path" risk />
        <Stat label="Hedge premium" value={formatUsd(result.premiumPerYear)} hint="/ year" />
        <Stat label="Working capital freed" value={formatUsd(result.workingCapitalFreed)} hint="first vintage" good />
        <Stat label="NPV · buffer path" value={formatUsd(result.npvBuffer)} hint={`${value.years}y`} />
        <Stat label="NPV · Thesis hedge" value={formatUsd(result.npvHedge)} hint={`${value.years}y`} good />
        <Stat label="NPV advantage" value={formatUsd(result.npvDelta)} hint="developer" good />
        <Stat label="Desk margin posted" value={formatUsd(result.deskMargin)} hint="annual notional" />
      </div>

      <WorkingCapitalBars
        bufferPct={value.bufferPct}
        premiumPct={value.premiumPct}
        trapped={result.trappedPerYear}
        premium={result.premiumPerYear}
        cashBuffer={result.cashBufferAnnual}
        cashHedge={result.cashHedgeAnnual}
        gross={result.grossAnnual}
      />
      <CashChart series={result.series} />
    </div>
  )
}

function WorkingCapitalBars({
  bufferPct,
  premiumPct,
  trapped,
  premium,
  cashBuffer,
  cashHedge,
  gross,
}: {
  bufferPct: number
  premiumPct: number
  trapped: number
  premium: number
  cashBuffer: number
  cashHedge: number
  gross: number
}) {
  return (
    <div className="mt-5 rounded-sm border border-line bg-ink/50 p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
        Year-1 cash vs trapped inventory · updates with sliders
      </p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Split
          label="Buffer path"
          leftPct={bufferPct}
          leftColor="#c4a572"
          leftText={`${bufferPct.toFixed(1)}% trapped · ${formatUsd(trapped)}`}
          rightText={`${(100 - bufferPct).toFixed(1)}% cash · ${formatUsd(cashBuffer)}`}
        />
        <Split
          label="Thesis hedge"
          leftPct={premiumPct}
          leftColor="#8a7349"
          leftText={`${premiumPct.toFixed(1)}% premium · ${formatUsd(premium)}`}
          rightText={`${(100 - premiumPct).toFixed(1)}% cash · ${formatUsd(cashHedge)}`}
        />
      </div>
      <p className="mt-2 font-mono text-[10px] text-mute">
        Gross vintage {formatUsd(gross)} / year. Both bars are that same dollar.
      </p>
    </div>
  )
}

function Split({
  label,
  leftPct,
  leftColor,
  leftText,
  rightText,
}: {
  label: string
  leftPct: number
  leftColor: string
  leftText: string
  rightText: string
}) {
  const width = Math.min(92, Math.max(6, leftPct))
  return (
    <div>
      <p className="mb-1.5 font-serif text-lg text-paper">{label}</p>
      <div className="flex h-10 overflow-hidden rounded-sm border border-line">
        <div className="flex items-center px-2" style={{ width: `${width}%`, background: leftColor }}>
          <span className="truncate font-mono text-[9px] text-ink">{leftPct.toFixed(0)}%</span>
        </div>
        <div className="flex flex-1 items-center bg-liquid/25 px-2">
          <span className="truncate font-mono text-[9px] text-paper-dim">cash</span>
        </div>
      </div>
      <p className="mt-1 text-[11px] text-gold">{leftText}</p>
      <p className="text-[11px] text-liquid">{rightText}</p>
    </div>
  )
}

function Stat({
  label,
  value,
  hint,
  risk,
  good,
}: {
  label: string
  value: string
  hint?: string
  risk?: boolean
  good?: boolean
}) {
  return (
    <div className="rounded-sm border border-line bg-ink/50 px-3 py-2.5">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-mute">{label}</p>
      <p className={`mt-1 font-serif text-xl ${risk ? 'text-risk' : good ? 'text-liquid' : 'text-paper'}`}>
        {value}
      </p>
      {hint && <p className="font-mono text-[10px] text-mute">{hint}</p>}
    </div>
  )
}
