# MAG

SaaS для фрилансеров и небольших маркетинговых агентств: CSV-выгрузки → KPI → брендированный отчёт и проверяемые AI-комментарии.

Сейчас в репозитории — **этап 1: bootstrap**. Продуктовые экраны, импорт и AI не реализованы.

## Быстрый старт

Нужны **Node.js 24**, **pnpm 12.3.4** и **Docker**.

```bash
nvm use
cp .env.example .env
# Замените SESSION_SECRET на случайную строку не короче 32 символов.

pnpm install
pnpm infra:up
pnpm dev
```

- Приложение: http://localhost:3000
- Готовность web: http://localhost:3000/api/health
- Готовность worker: http://localhost:3001/health

Если порты 5432 или 6379 заняты, задайте в `.env` свободные `POSTGRES_PUBLISH_PORT` / `REDIS_PUBLISH_PORT` и те же хост-порты в `DATABASE_URL` / `REDIS_URL`.

Подробности: [`docs/runbooks/local-development.md`](docs/runbooks/local-development.md), вклад в проект: [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Команды

```bash
pnpm dev          # web + worker
pnpm build        # сборка web и worker
pnpm typecheck    # TypeScript strict
pnpm lint         # ESLint
pnpm test         # unit и integration (нужны PostgreSQL и Redis)
pnpm format       # Prettier
pnpm infra:up     # PostgreSQL 17 и Redis 7
pnpm infra:down
```

## Стек этапа 1

| Инструмент | Версия                    |
| ---------- | ------------------------- |
| Node.js    | 24 (Active LTS, `.nvmrc`) |
| pnpm       | 12.3.4                    |
| Next.js    | 16.3.x                    |
| TypeScript | 5.9.x, `strict`           |
| PostgreSQL | 17 (Docker Compose)       |
| Redis      | 7 (Docker Compose)        |
| Turborepo  | 2.x                       |

## Документация

- [План продукта](docs/PROJECT_PLAN.md)
- [Discovery, этап 0](docs/discovery/README.md)
- [ADR-001: модульный монолит](docs/adr/001-modular-monolith.md)
- [Чаты по этапам](docs/chats/README.md)

CSV v1, KPI и структура отчёта зафиксированы в discovery как спецификация владельца. Реальные выгрузки в репозитории пока не заменяют синтетические примеры — это не блокирует bootstrap (решение D-041), но блокирует этапы импорта и отчёта.
