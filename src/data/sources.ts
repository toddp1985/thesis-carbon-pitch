export type SourceItem = {
  claim: string
  status: 'verified' | 'third-party' | 'illustrative'
  note: string
  href?: string
}

export const SOURCES: SourceItem[] = [
  {
    claim: 'Verra AFOLU Non-Permanence Risk Tool v4.2 sets a minimum overall risk rating of 12 (12% of net carbon-stock change deposited as buffer credits). Ratings above 60 fail.',
    status: 'verified',
    note: 'Primary: AFOLU NPRT v4.2 §§2.5.2–2.5.4 (last updated 3 May 2024).',
    href: 'https://verra.org/wp-content/uploads/2023/10/AFOLU-Non-Permanence-Risk-Tool-v4.2-last-updated-May-3-2024.pdf',
  },
  {
    claim: 'Buffer credits deposited in the AFOLU pooled buffer account cannot be traded and are not VCUs.',
    status: 'verified',
    note: 'Primary: VCS Standard v5.0 §3.2.16; Verra “Approaches to Durability.”',
    href: 'https://verra.org/wp-content/uploads/2025/12/VCS-Standard-v5.0.pdf',
  },
  {
    claim: 'AFOLU buffer analysis applies to GHG removals or avoided emissions through carbon sinks; N₂O, CH₄, and fossil-derived CO₂ reductions are not subject to AFOLU buffer withholding.',
    status: 'verified',
    note: 'Primary: AFOLU NPRT v4.2 §1.1.5. Geologic carbon storage uses a separate GCS NPRT / pooled account (VCS Standard v5.0 §2.4).',
    href: 'https://verra.org/wp-content/uploads/2023/10/AFOLU-Non-Permanence-Risk-Tool-v4.2-last-updated-May-3-2024.pdf',
  },
  {
    claim: 'Verra FAQ: land-based projects set aside a risk-adjusted percentage into a global buffer; at the end of a project’s last crediting period, remaining buffer credits are canceled. Loss events must be notified within 30 days.',
    status: 'verified',
    note: 'Primary: Verra FAQ (permanence / buffer). Time-release of some buffer credits back as VCUs is possible if risk ratings stay flat or fall (Registration and Issuance Process).',
    href: 'https://verra.org/faq/',
  },
  {
    claim: 'Gold Standard Land Use & Forests: 20% of issued PERs and GSVERs transfer into the Gold Standard Compliance Buffer (permanent-reduction / avoidance vintages exempt).',
    status: 'verified',
    note: 'Primary: Gold Standard GHG Emissions Reductions & Sequestration Product Requirements v2.0 §11.1.1.',
    href: 'https://globalgoals.goldstandard.org/standards/501_V2.0_TC_PR_GHG-Emissions-Reductions-Sequestration.pdf',
  },
  {
    claim: 'Verra launched a three-year Durability Pilot (December 2025) allowing approved insurance or a fund-based approach in lieu of AFOLU/GCS pooled-buffer contributions. CarbonPool and Kita policies approved 8 July 2026; Artio 25 August 2026.',
    status: 'verified',
    note: 'Primary: Verra program notices. Participation requires Verra approval. This is a pilot, not a standing rule that event contracts are accepted.',
    href: 'https://verra.org/verra-to-pilot-innovative-approaches-to-addressing-durability/',
  },
  {
    claim: 'Nature-based / REDD+ spot prices in 2025–2026 cluster roughly $4–6/t for generic REDD+, with higher-rated or regional prints nearer $8–10/t and ARR often $15–22/t.',
    status: 'third-party',
    note: 'Emsurge VCM assessment (Aug 2026): REDD+ ask average ~$4.85/t. Sylvera: REDD+ ~$6, IFM ~$15, ARR ~$22. MSCI Q3 2025: LatAm REDD+ ~$2.80 vs East Asia/Pacific ~$8.90. Modeling default $8/t is a quality-band assumption, not a benchmark.',
    href: 'https://emsurge.com/vcm-price-assessment-2026-08',
  },
  {
    claim: 'Public snapshots of Verra buffer inventory (~72–77 million credits in 2025) and “<6% of 1.3B+ issued.”',
    status: 'third-party',
    note: 'Yale Forest Forum slide (Liz Guinessey, 28 Oct 2025) cites 72,131,812 credits. Sylvera / LegalClarity cite ~77 million in 2025. Not a Verra primary registry extract in this memo — treat as ILLUSTRATIVE until confirmed against the registry.',
    href: 'https://yff.yale.edu/sites/default/files/files/10.28.25_yff_carbon_-_liz_guinessey_slides.pdf',
  },
  {
    claim: 'Carbon reversal / invalidation insurance premiums often cited from <1% to mid-single digits of credit value; shortfall products much wider.',
    status: 'third-party',
    note: 'CarbonPool estimates reversal insurance <1% of insured value (annual). Trellis (2024) quotes Oka CEO Chris Slater at 3–8% of annual base price. CarbonPool shortfall product: 5–25% (up to five years, single premium). Thin public actuarial history — premium bands in the storyboard are ILLUSTRATIVE.',
    href: 'https://www.carbonpool.earth/casestudy/permanence/',
  },
  {
    claim: 'Rimba Raya (Central Kalimantan) license revocation / litigation is a public host-country and title-risk pattern, not a named case study in this memo.',
    status: 'third-party',
    note: 'Indonesian MoEF cited unauthorized transfer, activity beyond permitted area, and unpaid state charges (2024). Subsequent court reversals and further appeals were reported in 2024–2026. Cited only as a risk pattern.',
    href: 'https://www.straitstimes.com/asia/se-asia/indonesia-revokes-licence-of-world-s-largest-forestry-offsets-project',
  },
  {
    claim: 'All market-size figures, Thesis premium targets (2.5–5%), desk-margin assumptions, Verde Corridor cashflows, and NPV comparisons.',
    status: 'illustrative',
    note: 'Invented for this memorandum. Not underwritten. Not for external outreach without a primary-source refresh and a real project file.',
  },
]
