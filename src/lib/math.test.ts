import { annuityNpv, computeCase, DEFAULT_INPUTS } from './math.ts'

const result = computeCase(DEFAULT_INPUTS)
const expectedGross = 120_000 * 8
if (result.grossAnnual !== expectedGross) {
  throw new Error(`grossAnnual ${result.grossAnnual} !== ${expectedGross}`)
}
if (result.trappedPerYear !== expectedGross * 0.15) {
  throw new Error('trappedPerYear mismatch')
}
if (result.cashBufferAnnual !== expectedGross * 0.85) {
  throw new Error('cashBufferAnnual mismatch')
}
if (result.cashHedgeAnnual !== expectedGross * 0.965) {
  throw new Error('cashHedgeAnnual mismatch')
}
const factor = annuityNpv(1, 10, 0.1)
if (Math.abs(result.npvBuffer - result.cashBufferAnnual * factor) > 0.01) {
  throw new Error('npvBuffer mismatch')
}
if (result.npvDelta <= 0) {
  throw new Error('expected hedge NPV advantage at defaults')
}
console.log('math.test.ts ok', {
  npvDelta: Math.round(result.npvDelta),
  trappedPerYear: result.trappedPerYear,
})
