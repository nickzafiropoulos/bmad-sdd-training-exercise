# Zaffr

A minimal todo list app built with the [T3 Stack](https://create.t3.gg/): **Next.js** (App Router), **tRPC**, **Drizzle ORM**, **SQLite/Turso** (libSQL), **Tailwind CSS**, and **TypeScript**.

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|--------|---------|
| `npm run dev` | Dev server (Next.js with Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production server (after `build`) |
| `npm test` | Unit and integration tests (Vitest) |
| `npm run test:coverage` | Tests with coverage report (`./coverage`) |
| `npm run test:e2e` | E2E tests (Playwright; starts the app automatically) |
| `npm run typecheck` | TypeScript type check without emit |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Run Drizzle migrations |
| `npm run db:push` | Push schema directly to database |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run db:clear-todos` | Delete all todos from the database |

## Database

**Local development** uses a SQLite file (`file:./db.sqlite` by default). Set `DATABASE_URL` in `.env`.

**Production (Vercel)** uses [Turso](https://turso.tech/) (hosted libSQL). You need both `DATABASE_URL` (the `https://` or `libsql://` URL) and `DATABASE_AUTH_TOKEN`. See the [root README](../README.md#deploying-to-vercel) for full setup steps.

## Docker

From the **repository root** (not `zaffr/`):

```bash
docker compose up --build
```

App: [http://localhost:3000](http://localhost:3000). Health: [http://localhost:3000/api/health](http://localhost:3000/api/health). SQLite data is persisted in the `zaffr-data` Docker volume.

## Tech stack

- [Next.js](https://nextjs.org) — React framework (App Router)
- [tRPC](https://trpc.io) — End-to-end typesafe APIs
- [Drizzle ORM](https://orm.drizzle.team) — TypeScript ORM for SQL
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS
- [Vitest](https://vitest.dev) — Unit and integration testing
- [Playwright](https://playwright.dev) — End-to-end testing
