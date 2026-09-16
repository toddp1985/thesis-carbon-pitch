import type { ReactNode } from 'react'
import type { CalculatorInputs } from '../lib/math'
import type { ChapterId } from '../data/chapters'
import { Calculator } from './Calculator'
import { IllustrativeBadge } from './IllustrativeBadge'
import { SourcesPanel } from './SourcesPanel'

type Props = {
  id: ChapterId
  inputs: CalculatorInputs
  onInputs: (next: CalculatorInputs) => void
}

export function ChapterBody({ id, inputs, onInputs }: Props) {
  switch (id) {
    case 'open':
      return <Open />
    case 'market':
      return <Market />
    case 'buffers':
      return <Buffers />
    case 'insurance':
      return <Insurance />
    case 'analogy':
      return <Analogy />
    case 'books':
      return <Books />
    case 'pitch':
      return <Pitch />
    case 'verde':
      return <Verde inputs={inputs} onInputs={onInputs} />
    case 'win':
      return <Win />
    case 'caveats':
      return <Caveats />
  }
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-[1.65] text-paper-dim">{children}</p>
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l border-gold/50 pl-4 font-serif text-[20px] leading-snug text-paper italic">
      {children}
    </blockquote>
  )
}

function Open() {
  return (
    <div className="grid gap-5">
      <P>
        Nature-based voluntary carbon is a delivery market wearing a climate certificate. Every
        vintage carries four risks that do not move together — and that a pooled buffer was never
        built to price.
      </P>
      <ol className="grid gap-3">
        {[
          ['Delivery', 'Baseline, leakage, additionality, the trees that were supposed to stand.'],
          ['Reversal / permanence', 'Fire, pest, illegal logging, drought. The tonne that comes back.'],
          ['Political / regulatory', 'Host-country export rules, Article 6 corresponding adjustments, license action.'],
          ['Invalidation', 'Methodology failure, over-crediting, title defects. The tonne that was never real.'],
        ].map(([title, body], i) => (
          <li key={title} className="flex gap-3 rounded-sm border border-line bg-ink-2/50 p-3">
            <span className="font-mono text-[11px] text-gold">0{i + 1}</span>
            <div>
              <p className="text-[14px] font-medium text-paper">{title}</p>
              <p className="mt-0.5 text-[13px] text-mute">{body}</p>
            </div>
          </li>
        ))}
      </ol>
      <Callout>
        The registry’s answer to permanence is inventory. It does not price politics. It does not
        price invalidation. It does not re-mark when the satellite print changes.
      </Callout>
    </div>
  )
}

function Market() {
  return (
    <div className="grid gap-5">
      <P>
        A corporate buyer <em className="text-paper">chooses</em> to buy. That is the voluntary part.
        Certification is not voluntary. Once a project sits in Verra, Gold Standard, ACR, or CAR,
        the rules are mandatory: monitoring, a validation/verification body, a risk tool, issuance,
        retirement.
      </P>
      <div className="grid grid-cols-2 gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-gold md:grid-cols-5">
        {['Project', 'MRV', 'VVB', 'Registry', 'Retirement'].map((step, i) => (
          <div key={step} className="rounded-sm border border-line px-2 py-3 text-center">
            <span className="block text-[10px] text-mute">0{i + 1}</span>
            {step}
          </div>
        ))}
      </div>
      <P>
        The buyer wants a tonne that stays a tonne. The registry wants a system that survives a
        fire in someone else’s project. Those two needs produced the buffer pool — a shared reserve
        of <em className="text-paper">non-tradable</em> credits skimmed at issuance.
      </P>
      <P>
        Thesis does not need to become a registry. Thesis needs the moment the registry will accept
        a financial guarantee in place of that skim. That door is now ajar.
      </P>
    </div>
  )
}

function Buffers() {
  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        <IllustrativeBadge tone="verified">NPRT min. 12%</IllustrativeBadge>
        <IllustrativeBadge tone="verified">Gold Standard 20%</IllustrativeBadge>
        <IllustrativeBadge tone="verified">Not tradable</IllustrativeBadge>
      </div>
      <P>
        Verra’s AFOLU Non-Permanence Risk Tool v4.2 does not pick a fashionable 10%. The minimum
        overall risk rating is <strong className="text-paper font-medium">12</strong> — twelve
        percent of the net change in project carbon stocks, deposited into the AFOLU pooled buffer
        account. Ratings above 60 fail. Buffer credits are not VCUs. They cannot be traded.
      </P>
      <P>
        Gold Standard Land Use & Forests is simpler and heavier: a flat 20% of issued PERs and
        GSVERs into the Compliance Buffer, unless the vintage is a permanent reduction or
        avoidance. Nature-based working range in this memo: <em className="text-paper">~10–20%+</em>,
        with risk-tool elevation above that. Treat the range as a planning band, not a quote.
      </P>
      <P>
        Engineered permanence sits outside the AFOLU biological-sink tool. Direct air capture with
        geologic storage is a GCS problem, not a forest buffer problem. The inventory tax we care
        about is a nature-based tax.
      </P>
      <Callout>Every withheld tonne is a tonne the developer cannot sell, finance, or recycle.</Callout>
      <P>
        Verra’s own FAQ is the punchline: at the end of a project’s last crediting period, remaining
        buffer credits are canceled. There is a narrow time-release path if risk ratings stay flat
        or fall — not a working-capital facility.
      </P>
      <P>
        Public snapshots put Verra’s pool near 72–77 million credits in 2025. Those are third-party
        prints, labeled as such in Sources. The structural point does not depend on the last digit:
        this is trapped inventory, marked at zero to the developer.
      </P>
    </div>
  )
}

function Insurance() {
  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        <IllustrativeBadge>Premiums 2–10%+ band</IllustrativeBadge>
        <IllustrativeBadge tone="verified">Verra Durability Pilot</IllustrativeBadge>
      </div>
      <P>
        Carbon insurance is no longer theoretical. Kita, CarbonPool, and Artio now have policies
        Verra has approved under a Durability Pilot launched December 2025 — insurance or a
        fund-based path in lieu of the pooled buffer, for participating projects. That is the
        regulatory crack.
      </P>
      <P>
        Pricing commentary is thin and wide. CarbonPool has estimated reversal cover below 1% of
        insured value. A 2024 trade interview put invalidation/reversal-style cover at 3–8% of
        annual base price. Shortfall products have been quoted 5–25%. For this memo, treat
        traditional premiums as an <em className="text-paper">illustrative 2–10%+</em> band with
        almost no public actuarial history.
      </P>
      <Callout>A policy is a bilateral promise. It is not a daily price, and it cannot warehouse correlation.</Callout>
      <P>
        Insurance still helps the developer sell more of the vintage. It does not give Thesis a
        book. The opening is that Verra has admitted a financial instrument can stand in for
        physical inventory. Event contracts are the next instrument through that door — if the
        oracle is clean and the margin is institutional.
      </P>
    </div>
  )
}

function Analogy() {
  return (
    <div className="grid gap-5">
      <P>
        Thesis already knows this product. Castle / Kalshi-style institutional event contracts:
        write a binary or a band, name the oracle, post margin, warehouse the other side. The sports
        book is the liquid training ground. The scoreboard settles. The desk gets paid to be wrong
        in a bounded way.
      </P>
      <P>
        Carbon is the same playbook pointed at a worse insured. Permanence, delivery, and
        host-country action are events. They already generate documents — loss-event reports,
        registry notices, satellite biomass prints, ministry decrees. Those documents can be
        oracles. The sports book stays a separate book. This is a new one to make.
      </P>
      <div className="grid gap-2 md:grid-cols-2">
        <div className="rounded-sm border border-line p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">Sports book</p>
          <p className="mt-2 text-[14px] text-paper-dim">
            Clear settlement. Dense flow. The desk learns how institutions want to transfer event
            risk.
          </p>
        </div>
        <div className="rounded-sm border border-line p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">Carbon book</p>
          <p className="mt-2 text-[14px] text-paper-dim">
            Same machinery. Worse actuarial history. A trapped-inventory incumbent that does not
            re-price.
          </p>
        </div>
      </div>
      <Callout>Replace an insurance problem — and a buffer problem — with a market problem.</Callout>
    </div>
  )
}

function Books() {
  return (
    <div className="grid gap-5">
      <P>
        Two books, run together. That is the product, not a single “carbon insurance” contract.
      </P>
      <div className="grid gap-3">
        <div className="rounded-sm border border-gold/30 bg-ink-2/70 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">Macro book</p>
          <p className="mt-2 font-serif text-2xl text-paper">Registry and sovereign shocks</p>
          <p className="mt-2 text-[14px] leading-relaxed text-paper-dim">
            Methodology sunsets. Host-country export bans. Article 6 corresponding-adjustment
            rules. A license review that hits a whole jurisdiction. Buyers: funds, asset managers,
            offtake aggregators who are long a book of vintages.
          </p>
        </div>
        <div className="rounded-sm border border-liquid/30 bg-ink-2/70 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-liquid">Micro book</p>
          <p className="mt-2 font-serif text-2xl text-paper">Project MRV</p>
          <p className="mt-2 text-[14px] leading-relaxed text-paper-dim">
            Satellite biomass versus quota. Delivery shortfall. A loss event inside one concession.
            Buyers: developers who need to sell 100% of issuance, and corporates who wrote an
            offtake they cannot miss.
          </p>
        </div>
      </div>
      <P>
        Static insurance prices one project, one peril, one year. A desk that sees both books
        prices the correlation — a ministry action in the same week as a biomass miss — which no
        buffer formula contains.
      </P>
    </div>
  )
}

function Pitch() {
  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        <IllustrativeBadge>2.5–5% cash premium / yr</IllustrativeBadge>
        <IllustrativeBadge tone="verified">Pilot door is open</IllustrativeBadge>
      </div>
      <P>
        The substitution is simple enough to put on one slide. Sell one hundred percent of the
        vintage. Pay Thesis a cash premium targeting roughly 2.5–5% of exposed asset value per
        year. All-in cash cost stays well inside the 12–20% inventory tax — if, and only if, the
        registry accepts the hedge in lieu of the physical buffer.
      </P>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-sm border border-risk/40 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-risk">Buffer path</p>
          <p className="mt-1 font-serif text-3xl text-paper">12–20%+</p>
          <p className="text-[12px] text-mute">Inventory trapped at issuance</p>
        </div>
        <div className="rounded-sm border border-liquid/40 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-liquid">Thesis path</p>
          <p className="mt-1 font-serif text-3xl text-paper">~2.5–5%</p>
          <p className="text-[12px] text-mute">Cash premium / year, illustrative</p>
        </div>
      </div>
      <P>
        The premium re-prices. The buffer does not. A fire season, a ministry rumor, a methodology
        consultation — the event market moves. The pooled account still holds last year’s skim.
      </P>
      <Callout>
        The franchise is not “be cheaper than insurance.” The franchise is: become the accepted
        financial guarantee, then make the market around it.
      </Callout>
      <P>
        Gating item, said plainly: registry acceptance of an approved financial guarantee — today
        an insurance policy under Verra’s pilot; tomorrow a cleared event-contract hedge — in lieu
        of physical buffer credits. Without that door, the developer still owes the inventory tax
        and the premium is only a second haircut. With it, Thesis is the cash-premium substitute.
      </P>
    </div>
  )
}

function Verde({
  inputs,
  onInputs,
}: {
  inputs: CalculatorInputs
  onInputs: (next: CalculatorInputs) => void
}) {
  return (
    <div className="grid gap-5">
      <div className="rounded-sm border border-risk/40 bg-risk/5 p-3">
        <IllustrativeBadge>Illustrative composite — not a real project</IllustrativeBadge>
        <p className="mt-2 text-[13px] leading-relaxed text-paper-dim">
          Verde Corridor Conservation is invented for this memo. Geography is a Southeast Asian
          lowland / peat-swamp forest corridor. It is not Rimba Raya, Katingan, or any named
          concession. Rimba Raya appears only as a public <em>pattern</em>: host-country license
          action can strand a vintage regardless of how full the buffer is.
        </p>
      </div>
      <P>
        Default file: 120,000 tCO₂e per year for ten years, $8/t — a quality-band nature price,
        not the distressed REDD+ ask. Buffer 15% (above Verra’s 12% floor, below Gold Standard’s
        20% flat). Thesis premium 3.5% of asset value. Developer discount rate 10%. Institutional
        desk posts 25% initial margin on annual notional — a SIG-style working assumption, not a
        quoted haircut.
      </P>
      <Calculator value={inputs} onChange={onInputs} />
    </div>
  )
}

function Win() {
  return (
    <div className="grid gap-5">
      <P>Three things have to be true for this to be a Thesis market rather than a slide.</P>
      <ol className="grid gap-3">
        {[
          [
            'Clean oracles',
            'Loss-event reports and registry holds. Ministry / license notices. Pre-agreed satellite biomass bands versus a quota. If it cannot settle, it is not a book.',
          ],
          [
            'The registry door',
            'Win acceptance — first as a recognized financial guarantee beside insurance, then as the liquid version of that guarantee. The Durability Pilot is the on-ramp, not the end state.',
          ],
          [
            'Price under the buffer’s opportunity cost',
            'Stay inside the 12–20% inventory tax with institutional margin discipline. Do not become the insurer of last resort. Warehouse what you can hedge; refuse what you cannot settle.',
          ],
        ].map(([title, body], i) => (
          <li key={title} className="rounded-sm border border-line p-3">
            <p className="font-mono text-[10px] text-gold">0{i + 1}</p>
            <p className="mt-1 font-serif text-xl text-paper">{title}</p>
            <p className="mt-1 text-[14px] leading-relaxed text-paper-dim">{body}</p>
          </li>
        ))}
      </ol>
      <Callout>Make the market. Do not become the buffer.</Callout>
    </div>
  )
}

function Caveats() {
  return (
    <div className="grid gap-5">
      <P>
        This memorandum was built from public standards, program notices, and third-party market
        prints, then modeled. It is an investor note to Thesis, not an offering, not a broker
        quote, and not a claim about any live project.
      </P>
      <ul className="grid list-disc gap-2 pl-5 text-[14px] leading-relaxed text-paper-dim">
        <li>
          Gemini-era research hypotheses sit underneath the product shape. Verify every number
          before any external conversation.
        </li>
        <li>
          Market sizes, buffer inventory totals, insurance bands, premium targets, and Verde
          Corridor NPVs are illustrative unless a source below is marked verified.
        </li>
        <li>
          Registry acceptance of event contracts is not granted. The Durability Pilot currently
          names insurance and fund-based paths.
        </li>
        <li>
          Sports remains a separate book. Carbon is a market to make, not a rebrand of the
          existing desk.
        </li>
      </ul>
      <SourcesPanel />
    </div>
  )
}
