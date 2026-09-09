# Участие в разработке MAG

## Среда

Следуйте [`docs/runbooks/local-development.md`](docs/runbooks/local-development.md). Нужны Node 24, pnpm 12.3.x и Docker.

## Правила этапа

- Источник требований: [`docs/PROJECT_PLAN.md`](docs/PROJECT_PLAN.md).
- Discovery-решения: [`docs/discovery/DECISION_LOG.md`](docs/discovery/DECISION_LOG.md).
- Не смешивать этапы: bootstrap не содержит продуктовых экранов, auth, импорта и AI.
- Секреты, `.env` и production credentials не коммитить. Шаблон — `.env.example`.

## Проверки перед PR

```bash
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm build
```

CI повторяет этот набор в GitHub Actions.

## Коммиты

После bootstrap — Conventional Commits и pull request в `main`. Примеры: `feat:`, `fix:`, `docs:`, `chore:`, `test:`.

Архитектурные решения фиксируйте в `docs/adr/`.
