# Thesis × Carbon Buffer Pools

Interactive investor memorandum **to Thesis**: institutional prediction markets as a cash-premium substitute for voluntary carbon registry buffer pools.

Written as a note from Todd Peoples (Thesis investor) to Thesis partners. Thesis-forward. Desktop-first for a pitch meeting; usable on a phone.

Hosted on **Cloudflare Workers only**. Not Vercel. Not GitHub Pages.

## CLAIM THIS NOW (60 minutes)

# https://dash.cloudflare.com/claim-preview?claimToken=Ottp3NJj5HF-DIdOwCxz1dLL9LAZPeEYM1DlnRwCN8o

Click that link while logged into **Todd’s Cloudflare account**. Claiming moves the Worker onto his account so it stops expiring.

## Live URL

**https://thesis-carbon-pitch.glowing-pancreas.workers.dev**

Cloudflare Workers static deploy of the storyboard. Browsers may see a short “verify you are human” interstitial on first visit.

## Production path (Todd’s account)

Permanent Worker name: `thesis-carbon-pitch`.

When `CLOUDFLARE_API_TOKEN` is available (Workers Scripts: Edit + Account Settings: Read), `npm run deploy` publishes to his account at:

`https://thesis-carbon-pitch.<his-workers-subdomain>.workers.dev`

`scripts/cf-deploy.sh` refuses `--temporary` for that production path. GitHub Actions: `.github/workflows/cloudflare.yml` (needs `CLOUDFLARE_API_TOKEN` and optional `CLOUDFLARE_ACCOUNT_ID`).

```bash
npm run deploy
```

Source: [toddp1985/thesis-carbon-pitch](https://github.com/toddp1985/thesis-carbon-pitch)
