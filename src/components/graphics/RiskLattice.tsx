import { Figure } from '../Figure'

const RISKS = [
  { n: '01', title: 'Delivery', note: 'Baseline, leakage, the trees that were supposed to stand.' },
  { n: '02', title: 'Reversal', note: 'Fire, pest, illegal logging — the tonne that comes back.' },
  { n: '03', title: 'Political', note: 'Host-country license, export rules, Article 6.' },
  { n: '04', title: 'Invalidation', note: 'Methodology failure, title defects — never a tonne.' },
]

export function RiskLattice() {
  return (
    <Figure caption="Four risks sit on every nature-based vintage. A pooled buffer was built for reversal, not for politics or invalidation, and it does not re-mark when any of them move.">
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-2 md:gap-3">
        {RISKS.map((risk) => (
          <div
            key={risk.title}
            className="flex flex-col justify-between rounded-sm border border-line bg-ink/70 p-3 md:p-4"
          >
            <p className="font-mono text-[10px] tracking-[0.16em] text-gold">{risk.n}</p>
            <div>
              <p className="font-serif text-xl text-paper md:text-2xl">{risk.title}</p>
              <p className="mt-1 text-[12px] leading-snug text-mute md:text-[13px]">{risk.note}</p>
            </div>
          </div>
        ))}
      </div>
    </Figure>
  )
}
