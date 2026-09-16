export type CalculatorInputs = {
  annualIssuance: number
  price: number
  bufferPct: number
  premiumPct: number
  years: number
  discountPct: number
  marginPct: number
}

export type YearPoint = {
  year: number
  bufferCum: number
  hedgeCum: number
}

export type CalculatorResult = {
  grossAnnual: number
  trappedPerYear: number
  cashBufferAnnual: number
  cashHedgeAnnual: number
  premiumPerYear: number
  deltaAnnual: number
  npvBuffer: number
  npvHedge: number
  npvDelta: number
  workingCapitalFreed: number
  totalTrapped: number
  deskMargin: number
  series: YearPoint[]
}

export const DEFAULT_INPUTS: CalculatorInputs = {
  annualIssuance: 120_000,
  price: 8,
  bufferPct: 15,
  premiumPct: 3.5,
  years: 10,
  discountPct: 10,
  marginPct: 25,
}

export function annuityNpv(payment: number, years: number, discount: number): number {
  if (years <= 0) return 0
  if (discount === 0) return payment * years
  let sum = 0
  for (let t = 1; t <= years; t += 1) {
    sum += payment / (1 + discount) ** t
  }
  return sum
}

export function computeCase(inputs: CalculatorInputs): CalculatorResult {
  const buffer = inputs.bufferPct / 100
  const premium = inputs.premiumPct / 100
  const discount = inputs.discountPct / 100
  const years = Math.max(1, Math.round(inputs.years))
  const grossAnnual = inputs.annualIssuance * inputs.price
  const trappedPerYear = grossAnnual * buffer
  const cashBufferAnnual = grossAnnual * (1 - buffer)
  const cashHedgeAnnual = grossAnnual * (1 - premium)
  const premiumPerYear = grossAnnual * premium
  const series: YearPoint[] = []
  for (let year = 1; year <= years; year += 1) {
    series.push({
      year,
      bufferCum: cashBufferAnnual * year,
      hedgeCum: cashHedgeAnnual * year,
    })
  }
  const npvBuffer = annuityNpv(cashBufferAnnual, years, discount)
  const npvHedge = annuityNpv(cashHedgeAnnual, years, discount)
  return {
    grossAnnual,
    trappedPerYear,
    cashBufferAnnual,
    cashHedgeAnnual,
    premiumPerYear,
    deltaAnnual: cashHedgeAnnual - cashBufferAnnual,
    npvBuffer,
    npvHedge,
    npvDelta: npvHedge - npvBuffer,
    workingCapitalFreed: trappedPerYear,
    totalTrapped: trappedPerYear * years,
    deskMargin: grossAnnual * (inputs.marginPct / 100),
    series,
  }
}

export function formatUsd(value: number, digits = 0): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? '−' : ''
  if (abs >= 1_000_000) {
    return `${sign}$${(abs / 1_000_000).toFixed(2)}M`
  }
  if (abs >= 1_000) {
    return `${sign}$${(abs / 1_000).toFixed(abs >= 10_000 ? 0 : 1)}k`
  }
  return `${sign}$${abs.toFixed(digits)}`
}

export function formatTonnes(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)} MtCO₂e`
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 10_000 ? 0 : 1)} ktCO₂e`
  return `${Math.round(value).toLocaleString()} tCO₂e`
}
