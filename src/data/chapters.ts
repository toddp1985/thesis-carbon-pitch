export type ChapterId =
  | 'open'
  | 'market'
  | 'buffers'
  | 'insurance'
  | 'analogy'
  | 'books'
  | 'pitch'
  | 'verde'
  | 'win'
  | 'caveats'

export type Chapter = {
  id: ChapterId
  kicker: string
  title: string
  nav: string
}

export const CHAPTERS: Chapter[] = [
  { id: 'open', kicker: '01 / Cold open', title: 'Four risks on every vintage', nav: 'Risks' },
  { id: 'market', kicker: '02 / Market structure', title: 'Voluntary buy. Mandatory rules.', nav: 'VCM' },
  { id: 'buffers', kicker: '03 / Buffer pools', title: 'A static inventory tax', nav: 'Buffers' },
  { id: 'insurance', kicker: '04 / Insurance', title: 'A policy is not a price', nav: 'Insurance' },
  { id: 'analogy', kicker: '05 / The book you already know', title: 'Event contracts, not a new religion', nav: 'Analogy' },
  { id: 'books', kicker: '06 / Product shape', title: 'Macro book. Micro book.', nav: 'Books' },
  { id: 'pitch', kicker: '07 / The substitution', title: 'Sell the tonne. Pay a cash premium.', nav: 'Pitch' },
  { id: 'verde', kicker: '08 / Case study', title: 'Verde Corridor — illustrative composite', nav: 'Verde' },
  { id: 'win', kicker: '09 / What we need', title: 'Oracles, the registry door, margin', nav: 'Win' },
  { id: 'caveats', kicker: '10 / Caveats', title: 'Hypotheses until they are not', nav: 'Sources' },
]
