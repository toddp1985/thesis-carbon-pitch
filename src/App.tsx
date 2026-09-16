import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ChapterBlock } from './components/ChapterBlock'
import { ChapterBody } from './components/ChapterBody'
import { BufferInventory } from './components/graphics/BufferInventory'
import { EventBook } from './components/graphics/EventBook'
import { HedgeVsBuffer } from './components/graphics/HedgeVsBuffer'
import { InsuranceCompare } from './components/graphics/InsuranceCompare'
import { RegistryPipeline } from './components/graphics/RegistryPipeline'
import { RiskLattice } from './components/graphics/RiskLattice'
import { TwinBooks } from './components/graphics/TwinBooks'
import { VerdeMap } from './components/graphics/VerdeMap'
import { WinGates } from './components/graphics/WinGates'
import { CHAPTERS } from './data/chapters'
import { useActiveSection, useScrollProgress } from './hooks/useScrollSpy'
import { computeCase, DEFAULT_INPUTS, type CalculatorInputs } from './lib/math'

gsap.registerPlugin(ScrollTrigger)

const SECTION_IDS = ['hero', ...CHAPTERS.map((chapter) => chapter.id)]

export default function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS)
  const progress = useScrollProgress()
  const active = useActiveSection(SECTION_IDS)
  const heroCopyRef = useRef<HTMLDivElement>(null)
  const result = useMemo(() => computeCase(inputs), [inputs])

  useEffect(() => {
    const node = heroCopyRef.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tween = gsap.to(node, {
      opacity: 0.18,
      y: -36,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
      const index = SECTION_IDS.indexOf(active)
      const go = (next: number) => {
        const id = SECTION_IDS[Math.max(0, Math.min(SECTION_IDS.length - 1, next))]
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      if (event.key === 'ArrowDown' || event.key === 'j' || event.key === ' ') {
        event.preventDefault()
        go(index + 1)
      } else if (event.key === 'ArrowUp' || event.key === 'k') {
        event.preventDefault()
        go(index - 1)
      } else if (event.key >= '1' && event.key <= '9') {
        event.preventDefault()
        go(Number(event.key))
      } else if (event.key === '0') {
        event.preventDefault()
        go(10)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <div className="bg-ink text-paper">
      <header className="sticky top-0 z-30 border-b border-line bg-ink/90 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
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
        </div>
        <div className="h-0.5 bg-gold/15" aria-hidden>
          <div className="h-full bg-gold" style={{ width: `${progress * 100}%` }} />
        </div>
      </header>

      <nav
        aria-label="Sections"
        className="fixed right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex"
      >
        {SECTION_IDS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            title={id === 'hero' ? 'Open' : CHAPTERS.find((chapter) => chapter.id === id)?.nav}
            className={`h-2 w-2 rounded-full transition ${
              active === id ? 'scale-125 bg-gold' : 'bg-mute/35 hover:bg-gold/60'
            }`}
            aria-current={active === id ? 'true' : undefined}
          >
            <span className="sr-only">{id}</span>
          </a>
        ))}
      </nav>

      <section
        id="hero"
        className="relative flex min-h-[calc(100dvh-57px)] flex-col justify-end overflow-hidden border-b border-line"
      >
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#090b0e_78%)]" />
        <div ref={heroCopyRef} className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-16 pt-24 md:px-10 md:pb-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
            A note to Thesis
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-[3.1rem] leading-[0.96] text-paper md:text-[5.4rem]">
            The buffer is dead capital.
            <span className="block text-gold-2">Make it a market.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-paper-dim md:text-[18px]">
            Nature-based voluntary carbon withholds 12–20%+ of every vintage as non-tradable
            inventory. Thesis can sell a cash-premium hedge in its place — if the registry will take
            a financial guarantee. Scroll the case.
          </p>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
            Scroll · j / k secondary
          </p>
        </div>
      </section>

      <ChapterBlock
        id="open"
        kicker={CHAPTERS[0].kicker}
        title={CHAPTERS[0].title}
        graphic={<RiskLattice />}
      >
        <ChapterBody id="open" inputs={inputs} onInputs={setInputs} />
      </ChapterBlock>

      <ChapterBlock
        id="market"
        kicker={CHAPTERS[1].kicker}
        title={CHAPTERS[1].title}
        graphic={<RegistryPipeline />}
      >
        <ChapterBody id="market" inputs={inputs} onInputs={setInputs} />
      </ChapterBlock>

      <ChapterBlock
        id="buffers"
        kicker={CHAPTERS[2].kicker}
        title={CHAPTERS[2].title}
        graphic={<BufferInventory bufferPct={inputs.bufferPct} trappedUsd={result.trappedPerYear} />}
      >
        <ChapterBody id="buffers" inputs={inputs} onInputs={setInputs} />
      </ChapterBlock>

      <ChapterBlock
        id="insurance"
        kicker={CHAPTERS[3].kicker}
        title={CHAPTERS[3].title}
        graphic={<InsuranceCompare />}
      >
        <ChapterBody id="insurance" inputs={inputs} onInputs={setInputs} />
      </ChapterBlock>

      <ChapterBlock
        id="analogy"
        kicker={CHAPTERS[4].kicker}
        title={CHAPTERS[4].title}
        graphic={<EventBook />}
      >
        <ChapterBody id="analogy" inputs={inputs} onInputs={setInputs} />
      </ChapterBlock>

      <ChapterBlock
        id="books"
        kicker={CHAPTERS[5].kicker}
        title={CHAPTERS[5].title}
        graphic={<TwinBooks />}
      >
        <ChapterBody id="books" inputs={inputs} onInputs={setInputs} />
      </ChapterBlock>

      <ChapterBlock
        id="pitch"
        kicker={CHAPTERS[6].kicker}
        title={CHAPTERS[6].title}
        graphic={<HedgeVsBuffer inputs={inputs} />}
      >
        <ChapterBody id="pitch" inputs={inputs} onInputs={setInputs} />
      </ChapterBlock>

      <ChapterBlock
        id="verde"
        kicker={CHAPTERS[7].kicker}
        title={CHAPTERS[7].title}
        graphic={<VerdeMap inputs={inputs} />}
      >
        <ChapterBody id="verde" inputs={inputs} onInputs={setInputs} />
      </ChapterBlock>

      <ChapterBlock
        id="win"
        kicker={CHAPTERS[8].kicker}
        title={CHAPTERS[8].title}
        graphic={<WinGates />}
      >
        <ChapterBody id="win" inputs={inputs} onInputs={setInputs} />
      </ChapterBlock>

      <ChapterBlock id="caveats" kicker={CHAPTERS[9].kicker} title={CHAPTERS[9].title} wide>
        <ChapterBody id="caveats" inputs={inputs} onInputs={setInputs} />
      </ChapterBlock>

      <footer className="px-5 py-10 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
        Confidential investor note · not an offering · Verde Corridor is illustrative
      </footer>
    </div>
  )
}
