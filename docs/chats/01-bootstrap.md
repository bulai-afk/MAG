# Чат 01 — Bootstrap и среда разработки

Ты работаешь только над этапом 1 проекта MAG. Прочитай `docs/PROJECT_PLAN.md`, `docs/chats/README.md` и результаты этапа 0. Сначала проверь Git, доступные версии Node/pnpm/Docker и текущее содержимое репозитория.

## Входное условие

Канонический CSV v1, базовые KPI и структура отчёта подтверждены. Если их нет, не маскируй проблему техническим bootstrap — сообщи blocker.

## Цель

Создать воспроизводимый monorepo skeleton и CI, на котором можно безопасно вести дальнейшую разработку.

## Выполни

1. Инициализируй pnpm workspace и Turborepo.
2. Создай `apps/web`, `apps/worker` и packages из архитектурного плана.
3. Зафиксируй совместимые версии Node и pnpm.
4. Настрой strict TypeScript, ESLint, Prettier и EditorConfig.
5. Добавь единые команды `dev`, `build`, `typecheck`, `lint`, `test`.
6. Настрой валидацию environment variables и безопасный `.env.example`.
7. Подними локальные PostgreSQL и Redis через Docker Compose.
8. Добавь health checks и минимальный worker.
9. Настрой unit test runner и основу integration tests.
10. Добавь GitHub Actions для install, typecheck, lint, test и build.
11. Создай ADR по модульному монолиту и инструкции запуска.

## Ограничения

- Не реализуй продуктовые страницы и бизнес-функции следующих этапов.
- Не добавляй production secrets.
- Не вводи микросервисы или Kubernetes.
- Новые зависимости должны иметь конкретное назначение.

## Готово, когда

- чистый clone запускается по README;
- web и worker стартуют локально;
- PostgreSQL и Redis проходят health check;
- команды проверки выполняются успешно;
- CI проходит;
- структура соответствует архитектурным границам.

В финале сообщи команды запуска, версии инструментов, результаты проверок и технический долг.
