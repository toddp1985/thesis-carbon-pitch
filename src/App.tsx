import gsap from 'gsap'
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { ChapterBody } from './components/ChapterBody'
import { CHAPTERS } from './data/chapters'
import { DEFAULT_INPUTS, type CalculatorInputs } from './lib/math'

const CanvasStage = lazy(async () => {
  const mod = await import('./components/CanvasStage')
  return { default: mod.CanvasStage }
})

export default function App() {
  const [index, setIndex] = useState(0)
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS)
  const copyRef = useRef<HTMLDivElement>(null)
  const chapter = CHAPTERS[index]
  const fill =
    chapter.id === 'verde'
      ? inputs.bufferPct / 35
      : chapter.id === 'buffers'
        ? 0.72
        : chapter.id === 'pitch'
          ? 0.28
          : 0.2

  const go = useCallback((next: number) => {
    setIndex((current) => {
      const clamped = Math.max(0, Math.min(CHAPTERS.length - 1, next))
      return Number.isFinite(next) ? clamped : current
    })
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
      if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'j') {
        event.preventDefault()
        setIndex((i) => Math.min(CHAPTERS.length - 1, i + 1))
      } else if (event.key === 'ArrowLeft' || event.key === 'k') {
        event.preventDefault()
        setIndex((i) => Math.max(0, i - 1))
      } else if (event.key >= '1' && event.key <= '9') {
        go(Number(event.key) - 1)
      } else if (event.key === '0') {
        go(9)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  useEffect(() => {
    let locked = false
    const onWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('[data-scrollbox="true"]')) return
      if (Math.abs(event.deltaY) < 40 || locked) return
      locked = true
      setIndex((i) =>
        event.deltaY > 0 ? Math.min(CHAPTERS.length - 1, i + 1) : Math.max(0, i - 1),
      )
      window.setTimeout(() => {
        locked = false
      }, 700)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  useEffect(() => {
    const node = copyRef.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      node,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.42, ease: 'power2.out' },
    )
  }, [index])

  return (
    <div className="min-h-dvh bg-ink text-paper">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-ink/85 px-4 py-3 backdrop-blur md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-gold/50 font-serif text-lg text-gold">
            T
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              Thesis · Investor memorandum
            </p>
            <p className="text-[13px] text-paper-dim">Carbon buffers as a market to make</p>
          </div>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-mute md:block">
          From Todd Peoples · To Thesis partners
        </p>
      </header>

      <div
        className="h-0.5 bg-gold/20"
        aria-hidden
      >
        <div
          className="h-full bg-gold transition-[width] duration-500"
          style={{ width: `${((index + 1) / CHAPTERS.length) * 100}%` }}
        />
      </div>

      <div className="grid min-h-[calc(100dvh-57px)] md:grid-cols-[72px_minmax(0,1fr)_minmax(0,1fr)]">
        <nav
          aria-label="Chapters"
          className="hidden flex-col items-center gap-2 border-r border-line py-6 md:flex"
        >
          {CHAPTERS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              title={item.nav}
              onClick={() => go(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? 'bg-gold scale-125' : 'bg-mute/40 hover:bg-gold/60'
              }`}
              aria-current={i === index}
              aria-label={`Chapter ${i + 1}: ${item.nav}`}
            />
          ))}
        </nav>

        <article
          data-scrollbox="true"
          className="relative max-h-[62vh] overflow-y-auto px-4 py-6 md:max-h-[calc(100dvh-57px)] md:px-10 md:py-10"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">{chapter.kicker}</p>
          <h1 className="mt-2 max-w-xl font-serif text-[34px] leading-[1.1] text-paper md:text-[42px]">
            {chapter.title}
          </h1>
          <div ref={copyRef} className="mt-6 max-w-xl">
            <ChapterBody id={chapter.id} inputs={inputs} onInputs={setInputs} />
          </div>
          <footer className="mt-10 flex max-w-xl items-center justify-between gap-3 border-t border-line pt-5">
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              className="rounded-sm border border-line px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-dim disabled:opacity-30"
            >
              Prev
            </button>
            <p className="font-mono text-[11px] text-mute">
              {String(index + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')} · ← →
            </p>
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index === CHAPTERS.length - 1}
              className="rounded-sm border border-gold/40 bg-gold/10 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-gold disabled:opacity-30"
            >
              Next
            </button>
          </footer>
        </article>

        <Suspense
          fallback={
            <div className="flex h-[38vh] items-center justify-center border-b border-line font-mono text-[11px] uppercase tracking-[0.16em] text-mute md:h-full md:border-b-0 md:border-l">
              Loading scene
            </div>
          }
        >
          <CanvasStage chapter={chapter.id} fill={fill} />
        </Suspense>
      </div>

      <nav
        aria-label="Chapters mobile"
        className="flex justify-center gap-1.5 border-t border-line px-3 py-3 md:hidden"
      >
        {CHAPTERS.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => go(i)}
            className={`h-2 w-2 rounded-full ${i === index ? 'bg-gold' : 'bg-mute/40'}`}
            aria-label={item.nav}
          />
        ))}
      </nav>
    </div>
  )
}
