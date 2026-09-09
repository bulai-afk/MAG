# HTTP API

Контракты application commands появятся с этапа 3. Сейчас доступны только служебные endpoints среды разработки.

| Метод | Путь               | Сервис | Назначение         |
| ----- | ------------------ | ------ | ------------------ |
| GET   | `/api/health/live` | web    | процесс жив        |
| GET   | `/api/health`      | web    | PostgreSQL и Redis |
| GET   | `/live`            | worker | процесс жив        |
| GET   | `/health`          | worker | PostgreSQL и Redis |

Продуктовые маршруты из [`docs/PROJECT_PLAN.md`](../PROJECT_PLAN.md) §15 не реализованы.
