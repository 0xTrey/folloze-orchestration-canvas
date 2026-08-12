# Cloudflare Migration Record

Status as of 2026-08-12: `migrated_verified_rollback_retained`.

## Source and targets

- canonical source before migration: `4053a5ba6dbf26d7cfe1eeb62e6bca49acbd58fa`
- Cloudflare Worker: `folloze-orchestration-canvas`
- Cloudflare URL: `https://folloze-orchestration-canvas.harnden-trey.workers.dev`
- first verified Cloudflare version: `eaa47f38-34f2-4edc-bbda-2ecd9a377b11`
- Vercel rollback URL: `https://folloze-orchestration-canvas.vercel.app`
- Vercel rollback deployment: `dpl_2fPLg289uTDSM8JK4Qrz49nU3NGS`

The project has no environment variables, custom domains, APIs, middleware, Server Actions, storage, crons, or Node-only application code. It contains two static Next.js App Router outputs: `/` and `/_not-found`.

## Translation

- Next.js moved from 16.2.4 to 16.3.0 because the current OpenNext adapter requires at least 16.2.11 and the latest patch cleared the dependency audit.
- `@opennextjs/cloudflare` 1.20.2 builds the Worker bundle.
- Wrangler 4.121.0 deploys the bundle with `nodejs_compat`, static assets, and Workers observability.
- GitHub Actions deploys `main`, then runs the anonymous production verifier.
- The Vercel deployment remains unchanged for rollback during observation.

## Verification evidence

The migration passed:

1. clean `npm ci` and zero `npm audit` findings;
2. ESLint;
3. the original Next.js production build;
4. the OpenNext bundle build;
5. local `workerd` route checks for root, query route, logo asset, and 404 behavior;
6. three consecutive anonymous production sweeps with an exact logo SHA-256 match;
7. a live browser render with the expected title and heading, eight Next.js scripts, animated inline state, and no console warnings or errors;
8. direct `/?cta=demo` browser routing; and
9. comparison with the retained Vercel app, including its existing same-page CTA behavior.

Cloudflare briefly returned 404 immediately after the first upload and then converged. `scripts/verify-cloudflare.sh` therefore requires three consecutive successful sweeps and retries for up to twelve attempts.

## Retirement gate

Do not delete the Vercel project until:

- the independent `main` GitHub Actions deployment passes;
- the Worker remains healthy for at least 24 hours;
- Workers logs show the expected traffic without unhandled exceptions;
- a rollback rehearsal confirms the saved Vercel deployment remains Ready; and
- the migration ledger records the completed observation window.
