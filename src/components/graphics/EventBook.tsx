import { Figure } from '../Figure'

export function EventBook() {
  return (
    <Figure caption="Same machinery Thesis already runs on sports and event contracts: name the event, name the oracle, post margin, warehouse the other side. Carbon is a new book, not a rebrand of the sports book.">
      <div className="grid h-full content-center gap-3 md:gap-4">
        <Panel
          kicker="Sports book"
          title="Scoreboard settles"
          points={['Clear oracle', 'Dense flow', 'Bounded loss']}
          accent="text-gold"
        />
        <div className="flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
          same desk machinery →
        </div>
        <Panel
          kicker="Carbon book"
          title="Documents settle"
          points={['Loss-event report', 'Registry hold / license notice', 'Satellite vs quota']}
          accent="text-liquid"
        />
      </div>
    </Figure>
  )
}

function Panel({
  kicker,
  title,
  points,
  accent,
}: {
  kicker: string
  title: string
  points: string[]
  accent: string
}) {
  return (
    <div className="rounded-sm border border-line bg-ink/70 p-4">
      <p className={`font-mono text-[10px] uppercase tracking-[0.16em] ${accent}`}>{kicker}</p>
      <p className="mt-1 font-serif text-2xl text-paper">{title}</p>
      <ul className="mt-3 grid gap-1.5 text-[13px] text-paper-dim">
        {points.map((point) => (
          <li key={point} className="flex gap-2">
            <span className="text-gold">▸</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}
