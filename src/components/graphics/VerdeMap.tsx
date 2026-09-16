import { Figure } from '../Figure'
import { computeCase, formatTonnes, formatUsd, type CalculatorInputs } from '../../lib/math'

type Props = {
  inputs: CalculatorInputs
}

export function VerdeMap({ inputs }: Props) {
  const result = computeCase(inputs)
  const trappedT = inputs.annualIssuance * (inputs.bufferPct / 100)

  return (
    <Figure caption="Verde Corridor Conservation is an invented Southeast Asian lowland / peat-swamp composite — not Rimba Raya, Katingan, or any named concession. Numbers on the map follow the calculator.">
      <div className="flex h-full flex-col justify-center gap-3">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-serif text-xl text-paper md:text-2xl">Verde Corridor</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-risk">
            Illustrative composite
          </p>
        </div>
        <svg
          viewBox="0 0 640 420"
          className="h-auto w-full max-h-[min(48vh,380px)]"
          role="img"
          aria-label="Stylized map of an invented forest corridor with buffer parcels and a river"
        >
          <rect width="640" height="420" fill="#0c1210" />
          <path
            d="M0 40 C80 20 140 70 220 55 C300 40 340 90 420 70 C500 50 560 90 640 60 V420 H0 Z"
            fill="#152018"
          />
          <path
            d="M0 210 C90 180 150 230 240 200 C320 170 390 230 470 200 C540 175 600 210 640 190 V420 H0 Z"
            fill="#1b2a20"
          />
          <path
            d="M40 420 C80 300 160 280 210 250 C250 228 270 200 300 210 C340 224 360 300 420 320 C470 336 520 280 580 300 C610 312 630 350 640 380 V420 Z"
            fill="#24362c"
          />
          <path
            d="M0 330 C70 310 120 350 190 340 C250 332 280 300 340 318 C400 336 430 380 510 360 C560 348 600 370 640 355 V420 H0 Z"
            fill="#1a2620"
          />
          <path
            d="M18 40 C70 120 90 200 70 290 C55 350 40 390 28 420"
            fill="none"
            stroke="#0a1c22"
            strokeWidth="28"
            strokeLinecap="round"
          />
          <path
            d="M18 40 C70 120 90 200 70 290 C55 350 40 390 28 420"
            fill="none"
            stroke="#16343c"
            strokeWidth="10"
          />
          <path
            d="M168 96 L392 78 L468 168 L430 262 L248 286 L176 198 Z"
            fill="#2f4a38"
            stroke="#c4a572"
            strokeWidth="1.6"
          />
          <path
            d="M168 96 L392 78 L418 118 L210 142 Z"
            fill="#c4a572"
            opacity="0.38"
          />
          <path
            d="M392 78 L468 168 L430 200 L400 130 Z"
            fill="#c4a572"
            opacity="0.28"
          />
          <path
            d="M210 250 C248 220 300 236 318 268 C280 290 230 292 210 250 Z"
            fill="#3a2e18"
            opacity="0.7"
          />
          <circle cx="296" cy="188" r="4" fill="#f3efe6" />
          <path d="M296 188 L360 130" stroke="#c4a572" strokeWidth="1" />
          <path d="M250 110 L250 52" stroke="#c4a572" strokeWidth="1" />
          <path d="M430 230 L510 230" stroke="#c4a572" strokeWidth="1" />
          <path d="M270 268 L270 330" stroke="#8a7349" strokeWidth="1" />
          <text x="254" y="46" fill="#c4a572" fontSize="11" fontFamily="IBM Plex Mono, monospace">
            Buffer ring · not VCUs
          </text>
          <text x="368" y="122" fill="#f3efe6" fontSize="12" fontFamily="Instrument Serif, serif">
            Concession (invented)
          </text>
          <text x="518" y="226" fill="#c9c2b3" fontSize="11" fontFamily="IBM Plex Mono, monospace">
            Host-country edge
          </text>
          <text x="232" y="348" fill="#8a7349" fontSize="11" fontFamily="IBM Plex Mono, monospace">
            Peat fringe
          </text>
          <text x="36" y="28" fill="#6b9e8a" fontSize="10" fontFamily="IBM Plex Mono, monospace">
            Composite water · not a real gulf
          </text>
        </svg>
        <div className="grid grid-cols-2 gap-2 text-[12px] md:grid-cols-4">
          <Stat label="Issuance" value={formatTonnes(inputs.annualIssuance)} hint="/ year" />
          <Stat label="Buffer withheld" value={formatTonnes(trappedT)} hint="trapped tonnes" risk />
          <Stat label="Dead capital" value={formatUsd(result.trappedPerYear)} hint="/ year" risk />
          <Stat label="Hedge premium" value={formatUsd(result.premiumPerYear)} hint="/ year" />
        </div>
      </div>
    </Figure>
  )
}

function Stat({
  label,
  value,
  hint,
  risk,
}: {
  label: string
  value: string
  hint: string
  risk?: boolean
}) {
  return (
    <div className="rounded-sm border border-line bg-ink/70 px-2 py-2">
      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-mute">{label}</p>
      <p className={`font-serif text-lg ${risk ? 'text-risk' : 'text-paper'}`}>{value}</p>
      <p className="font-mono text-[9px] text-mute">{hint}</p>
    </div>
  )
}
