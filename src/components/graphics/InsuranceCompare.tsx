import { Figure } from '../Figure'

export function InsuranceCompare() {
  return (
    <Figure caption="Insurance is a cash premium with almost no public actuarial history. The buffer is an inventory tax that never re-prices. Verra’s Durability Pilot admits a financial instrument can stand in for the pool — that is the crack, not the finished product.">
      <div className="flex h-full flex-col justify-center gap-6">
        <Bar
          label="Traditional carbon insurance"
          band="Illustrative 2–10%+ of credit value / year"
          width="42%"
          color="bg-gold-2"
          note="Bilateral policy. No daily price. Cannot warehouse correlation."
        />
        <Bar
          label="Registry buffer (nature-based)"
          band="12% Verra floor · 20% Gold Standard"
          width="78%"
          color="bg-risk"
          note="Physical inventory, trapped at issuance, canceled at last crediting period."
        />
        <Bar
          label="Thesis cash premium (target)"
          band="Illustrative 2.5–5% of asset value / year"
          width="28%"
          color="bg-liquid"
          note="Re-prices. Only substitutes the buffer if the registry accepts the hedge."
        />
      </div>
    </Figure>
  )
}

function Bar({
  label,
  band,
  width,
  color,
  note,
}: {
  label: string
  band: string
  width: string
  color: string
  note: string
}) {
  return (
    <div>
      <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-serif text-lg text-paper">{label}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold">{band}</p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-ink-3">
        <div className={`h-full rounded-full ${color}`} style={{ width }} />
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-mute">{note}</p>
    </div>
  )
}
