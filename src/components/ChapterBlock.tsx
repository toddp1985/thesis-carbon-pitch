import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  id: string
  kicker: string
  title: string
  graphic?: ReactNode
  children: ReactNode
  wide?: boolean
}

export function ChapterBlock({ id, kicker, title, graphic, children, wide }: Props) {
  if (wide) {
    return (
      <section id={id} className="scroll-mt-16 border-b border-line">
        <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{kicker}</p>
            <h2 className="mt-3 font-serif text-[2.1rem] leading-[1.08] text-paper md:text-[3.25rem]">
              {title}
            </h2>
            <div className="mt-8">{children}</div>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section id={id} className="scroll-mt-16 border-b border-line">
      <div className="mx-auto grid max-w-[1240px] md:grid-cols-2">
        <div className="relative border-b border-line bg-ink-2/40 px-5 py-8 md:sticky md:top-16 md:h-[calc(100dvh-4rem)] md:border-b-0 md:border-r md:px-8 md:py-10">
          {graphic}
        </div>
        <div className="px-5 py-14 md:px-10 md:py-24">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{kicker}</p>
            <h2 className="mt-3 max-w-xl font-serif text-[2.1rem] leading-[1.08] text-paper md:text-[3.1rem]">
              {title}
            </h2>
            <div className="mt-8 max-w-xl">{children}</div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
