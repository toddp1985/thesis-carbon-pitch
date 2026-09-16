# Thesis × Carbon Buffer Pools

Interactive investor memorandum **to Thesis**: institutional prediction markets as a cash-premium substitute for voluntary carbon registry buffer pools.

Written as a note from Todd Peoples (Thesis investor) to Thesis partners. Thesis-forward. Desktop-first for a pitch meeting; usable on a phone.

Hosted on **Cloudflare Workers only**. Not Vercel. Not GitHub Pages.

## Live URL

**https://thesis-carbon-pitch.tranquil-thrill.workers.dev**

This is a Cloudflare Workers static deploy of the storyboard.

### Make it durable (claim into Todd’s Cloudflare account)

The agent environment cannot log into a production Cloudflare account, so the first publish uses Cloudflare’s preview-account path. **Claim it within 60 minutes of publish** so the Worker moves onto your account and stops expiring:

[Claim this Cloudflare Worker](https://dash.cloudflare.com/claim-preview?claimToken=6F-2lUbGtEdC4YEjxqXcVp_kKJOAAPifJJcPRLJ4z1w)

After claim, the Worker is a normal production Worker on your account. Keep it at the `workers.dev` URL above, or attach a custom domain in the Cloudflare dashboard.

### Lasting production deploys from GitHub

Add these repository secrets on [toddp1985/thesis-carbon-pitch](https://github.com/toddp1985/thesis-carbon-pitch), then every push to `main` publishes production via Wrangler:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Workflow: `.github/workflows/cloudflare.yml`.

```bash
npm run build
npx wrangler deploy
```

Source: [toddp1985/thesis-carbon-pitch](https://github.com/toddp1985/thesis-carbon-pitch)

## What this is

A ten-chapter storyboard:

1. Four risks on every nature-based vintage
2. How the voluntary market and mandatory registry rules fit together
3. Buffer pools as trapped inventory (Verra minimum 12%, Gold Standard 20%)
4. Traditional carbon insurance — and Verra’s Durability Pilot
5. The event-contract book Thesis already knows (Castle / Kalshi-style; sports stays a separate book)
6. Macro book + micro book
7. Sell 100% of issuance; pay a cash premium
8. **Verde Corridor Conservation** — labeled **ILLUSTRATIVE COMPOSITE** (not a real project) with an interactive buffer-vs-premium calculator
9. Oracles, the registry door, margin discipline
10. Caveats plus a Sources footer that separates **verified / third-party / illustrative**

Keys: `←` `→` `j` `k` `space`, or the rail / Next. Wheel advances a chapter unless the pointer is in the memo column.

## Numbers policy

Every market-size figure, buffer-inventory total, insurance-premium band, commercial reading of the Verra pilot, and Verde NPV is **illustrative** unless the Sources chapter marks it verified against a primary document.

Modeling defaults (change them on the calculator):

| Input | Default | Why |
| --- | --- | --- |
| Annual issuance | 120,000 tCO₂e | Mid-size nature program, not a flagship |
| Credit price | $8 / t | Quality-band nature; generic REDD+ asks have printed nearer $4–6 |
| Buffer | 15% | Above Verra’s 12% floor, below Gold Standard’s 20% flat |
| Thesis premium | 3.5% of asset value / year | Inside the 2.5–5% target band |
| Horizon / discount | 10 years / 10% | Developer WACC-style annuity |
| Desk margin | 25% of annual notional | SIG-style working assumption for the market-maker, not a developer cost |

Buffer credits are treated as unsold. Per Verra’s FAQ they are canceled at the end of the last crediting period; the model does not assume a terminal recovery. Rimba Raya is mentioned only as a public host-country / license-risk *pattern*. It is not the case study.

## Stack

Vite · React · TypeScript · Tailwind v4 · three.js · GSAP. Static export. No backend. No secrets.

## Run locally

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:43173](http://127.0.0.1:43173)

```bash
npm run build
npm run preview
```

## Constraints honored

- No named market-making firm. Institutional / SIG-style desk language only.
- Thesis branding and investor-memo tone throughout.
- three.js scene morphs with chapter; GSAP handles copy transitions; `prefers-reduced-motion` is respected.
- Hosting is Cloudflare Workers. No Vercel.
