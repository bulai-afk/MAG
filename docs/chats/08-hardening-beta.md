# Чат 08 — Hardening и закрытая beta

Ты работаешь только над этапом 8 MAG. Прочитай нефункциональные требования, безопасность, наблюдаемость, тесты, CI/CD и Definition of Done в `docs/PROJECT_PLAN.md`. Проведи аудит фактической реализации этапов 1–7.

## Входное условие

Критический пользовательский сценарий функционально завершён. Открытые дефекты и технический долг задокументированы.

## Цель

Подготовить продукт к безопасной закрытой beta с 5–10 агентствами.

## Выполни

1. Составь traceability matrix требований и тестов.
2. Закрой critical E2E flow.
3. Проверь cross-tenant, IDOR, upload, XSS, CSRF и share links.
4. Проведи dependency и container scan.
5. Выполни load smoke для максимального CSV и публичного отчёта.
6. Настрой structured logs, metrics, error tracking и alerts.
7. Подготовь staging и production containers.
8. Настрой managed DB/Redis/Object Storage и ограниченный IAM.
9. Настрой backup и фактически проверь restore.
10. Подготовь migration, deploy, rollback, incident и support runbooks.
11. Добавь product analytics без чувствительных данных.
12. Подготовь beta onboarding, feedback loop и success dashboard.

## Ограничения

- Не скрывай flaky tests и известные high-risk дефекты.
- Не используй реальные клиентские данные на staging.
- Не подключай автоматические платежи.
- Не расширяй scope функциями после MVP.

## Готово, когда

- critical E2E стабилен;
- нет известных critical/high vulnerabilities;
- restore проверен;
- alerts доставляются;
- rollback описан и протестирован;
- 5–10 beta-пользователей могут быть подключены;
- продуктовые метрики собираются.

В финале дай решение go/no-go, список принятых рисков, monitoring links и план поддержки beta.
