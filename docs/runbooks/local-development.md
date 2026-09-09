# Локальный запуск MAG

Для чистого clone. Команды выполняются из корня репозитория.

## Требования

- Node.js 24 (Active LTS). В репозитории: `.nvmrc`, `.node-version`, `package.json#engines`.
- pnpm 12.3.4 (`packageManager` в корневом `package.json`).
- Docker Engine и Docker Compose v2+.

Проверка:

```bash
node -v    # v24.x
pnpm -v    # 12.3.x
docker compose version
```

Если в PATH другая мажорная версия Node (например, Homebrew 26), переключитесь:

```bash
nvm use
```

## Первый запуск

```bash
cp .env.example .env
# Замените SESSION_SECRET на случайную строку ≥ 32 символов.

pnpm install
pnpm infra:up
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm dev
```

`pnpm infra:up` поднимает PostgreSQL 17 и Redis 7 и ждёт health check контейнеров. Порты по умолчанию — 5432 и 6379. Если они заняты, задайте в `.env` свободные `POSTGRES_PUBLISH_PORT` / `REDIS_PUBLISH_PORT` и те же значения в `DATABASE_URL` / `REDIS_URL`.

Приложения:

| Процесс          | URL                                   |
| ---------------- | ------------------------------------- |
| web              | http://localhost:3000                 |
| web liveness     | http://localhost:3000/api/health/live |
| web readiness    | http://localhost:3000/api/health      |
| worker liveness  | http://localhost:3001/live            |
| worker readiness | http://localhost:3001/health          |

Ожидаемый ответ readiness: JSON со `status: "ok"` и проверками `postgres` и `redis`.

Остановить инфраструктуру: `pnpm infra:down`.

## Команды

| Команда                             | Назначение                                       |
| ----------------------------------- | ------------------------------------------------ |
| `pnpm dev`                          | web (Next.js) и worker параллельно               |
| `pnpm build`                        | сборка web и worker                              |
| `pnpm typecheck`                    | `tsc --noEmit` по workspace                      |
| `pnpm lint`                         | ESLint по workspace                              |
| `pnpm test`                         | Vitest, включая integration к PostgreSQL и Redis |
| `pnpm format` / `pnpm format:check` | Prettier                                         |

Тесты ожидают доступные `DATABASE_URL` и `REDIS_URL` из `.env` или окружения CI.

## Структура

Границы модулей — в [`docs/adr/001-modular-monolith.md`](../adr/001-modular-monolith.md) и `packages/domain`. Продуктовые страницы, auth, импорт CSV и AI в этом этапе не реализуются.
