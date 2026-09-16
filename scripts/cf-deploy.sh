#!/usr/bin/env bash
# Production deploy into Todd's Cloudflare account only.
# Never use wrangler --temporary / claim-preview sandboxes.
set -euo pipefail

if [[ "$*" == *"--temporary"* ]]; then
  echo "Refusing --temporary. This project deploys only to a real Cloudflare account." >&2
  exit 2
fi

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  echo "CLOUDFLARE_API_TOKEN is not set." >&2
  echo "Add a token with Workers Scripts Edit (and Account Settings Read) on Todd's Cloudflare account, then rerun npm run deploy." >&2
  echo "Do not use wrangler deploy --temporary." >&2
  exit 2
fi

cd "$(dirname "$0")/.."
npm run build
exec npx wrangler deploy "$@"
