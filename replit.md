# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

### Mediona Rug Revival

Frontend-only React/Vite hackathon MVP for a Moroccan rug heritage showcase and artisan pre-order concept. The app lives in `artifacts/mediona-rug-revival` and is served at `/`.

Key product features:
- Multilingual UI with English, French, and Arabic language toggle, including RTL handling for Arabic.
- Arabic is the default language and uses dedicated Arabic typography.
- Rug, product, culture, learning, QR story, form, and navigation copy are localized in Arabic, French, and English.
- Landing page, cultural story page, shop page, product detail pages, QR story pages, and learning/quiz page.
- Visitor registration page at `/register` with simulated roles for sellers, buyers, and learners.
- Simulated rug/artisan/cultural data in `src/lib/data.ts`.
- Translation strings and language context in `src/lib/i18n.tsx`.
- Embedded YouTube videos are used for the learning section and product/story pages via privacy-enhanced embed URLs.
- Images are imported through Vite asset imports rather than `/src/assets/...` string paths so they are bundled correctly for publishing.
- No backend or database required for the MVP; order form and quiz interactions are simulated client-side.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Web frontend**: React + Vite + Tailwind CSS

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
