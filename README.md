# BMAD training — Zaffr todo app

This repository is a **BMAD Method** training exercise: product planning workflows, artifacts, and a working reference implementation of **Zaffr**, a small todo list application.

**Application code** lives in [`zaffr/`](./zaffr/). Planning outputs, BMAD framework files, and process notes are elsewhere in the tree (for example `_bmad-output/`, `docs/task-progress-documentation/`).

## Zaffr (the app)

Zaffr is a todo list built with the [T3 Stack](https://create.t3.gg/): **Next.js** (App Router), **tRPC**, **Drizzle ORM**, **SQLite** (via libSQL), **Tailwind CSS**, and **TypeScript**. It includes Vitest and Playwright tests.

### Local development

From the **`zaffr/`** directory:

```bash
cd zaffr
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Adjust `DATABASE_URL` in `.env` if you change where SQLite stores data.

### Useful scripts (`zaffr/`)

| Command | Purpose |
|--------|---------|
| `npm run dev` | Dev server (Next.js with Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production server (after `build`) |
| `npm test` | Vitest (unit / integration) |
| `npm run test:coverage` | Tests with coverage report |
| `npm run test:e2e` | Playwright E2E |
| `npm run db:studio` | Drizzle Studio |
| `npm run db:clear-todos` | Clear all todos (script) |

More detail: [`zaffr/README.md`](./zaffr/README.md).

### Docker

From the **repository root**:

```bash
docker compose up --build
```

The app is exposed on [http://localhost:3000](http://localhost:3000). SQLite data is persisted in the `zaffr-data` Docker volume. Health check: `/api/health`.

## Repository layout (high level)

| Path | Contents |
|------|----------|
| `zaffr/` | Next.js application |
| `_bmad/` | BMAD framework assets |
| `_bmad-output/` | Generated planning and implementation artifacts |
| `docs/` | Task progress and training documentation |
| `docker-compose.yml` | Container setup for Zaffr |

## Contributing / learning

- Application README: [`zaffr/README.md`](./zaffr/README.md)
- T3 Stack docs: [create.t3.gg](https://create.t3.gg/)
