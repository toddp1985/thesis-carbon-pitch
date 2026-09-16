import { SOURCES } from '../data/sources'
import { IllustrativeBadge } from './IllustrativeBadge'

export function SourcesPanel() {
  return (
    <div className="mt-6 border-t border-line pt-6">
      <h3 className="font-serif text-2xl text-paper">Sources / what we checked</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-mute">
        Verified means we read a primary registry or standard document. Third-party means a
        reputable secondary print that is still not a registry extract. Illustrative means we
        modeled it for this memo and it must not travel externally without a refresh.
      </p>
      <ol className="mt-4 grid gap-3">
        {SOURCES.map((item) => (
          <li key={item.claim} className="rounded-sm border border-line bg-ink-2/60 p-3">
            <div className="mb-2">
              <IllustrativeBadge tone={item.status} />
            </div>
            <p className="text-[14px] leading-relaxed text-paper-dim">{item.claim}</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-mute">{item.note}</p>
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block font-mono text-[11px] text-gold underline decoration-gold/30 underline-offset-4 hover:decoration-gold"
              >
                Open source
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
