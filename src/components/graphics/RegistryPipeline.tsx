import { Figure } from '../Figure'

const STEPS = [
  { n: '01', title: 'Project', tone: 'choice' },
  { n: '02', title: 'MRV', tone: 'rule' },
  { n: '03', title: 'VVB', tone: 'rule' },
  { n: '04', title: 'Registry', tone: 'rule' },
  { n: '05', title: 'Retirement', tone: 'rule' },
] as const

export function RegistryPipeline() {
  return (
    <Figure caption="The buyer chooses to participate. After listing, every step is mandatory. The buffer skim happens at issuance — between registry and retirement — as non-tradable inventory.">
      <div className="flex h-full flex-col justify-center gap-5">
        <div className="grid gap-2">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex items-center gap-3">
              <div
                className={`flex h-12 min-w-0 flex-1 items-center justify-between rounded-sm border px-3 ${
                  step.tone === 'choice'
                    ? 'border-liquid/35 bg-liquid/8'
                    : 'border-line bg-ink/70'
                }`}
              >
                <span className="font-mono text-[10px] text-gold">{step.n}</span>
                <span className="font-serif text-lg text-paper md:text-xl">{step.title}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-mute">
                  {step.tone === 'choice' ? 'Voluntary' : 'Mandatory'}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="hidden font-mono text-gold/50 md:inline" aria-hidden>
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="rounded-sm border border-gold/30 bg-gold/8 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-gold">
          Buffer skim · non-tradable · at issuance
        </div>
      </div>
    </Figure>
  )
}
