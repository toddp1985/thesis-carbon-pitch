import { Figure } from '../Figure'

export function WinGates() {
  return (
    <Figure caption="Three gates, in order. Without a clean oracle there is no book. Without the registry door the premium is a second haircut on top of the buffer. Without margin discipline Thesis becomes the buffer.">
      <ol className="flex h-full flex-col justify-center gap-3">
        {[
          ['01', 'Clean oracles', 'If it cannot settle, it is not a book.'],
          ['02', 'Registry door', 'Financial guarantee in lieu of physical inventory.'],
          ['03', 'Price under the tax', 'Stay inside 12–20%. Warehouse what you can hedge.'],
        ].map(([n, title, note]) => (
          <li key={n} className="flex gap-3 rounded-sm border border-line bg-ink/70 p-4">
            <span className="font-mono text-[11px] text-gold">{n}</span>
            <div>
              <p className="font-serif text-xl text-paper">{title}</p>
              <p className="mt-1 text-[13px] text-mute">{note}</p>
            </div>
          </li>
        ))}
      </ol>
    </Figure>
  )
}
