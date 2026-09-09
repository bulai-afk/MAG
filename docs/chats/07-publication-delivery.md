# Чат 07 — Публикация, PDF и доставка

Ты работаешь только над этапом 7 MAG. Прочитай модель snapshots/share links/deliveries, требования PDF и безопасность публичных ссылок в `docs/PROJECT_PLAN.md`.

## Входное условие

Draft отчёта, графики и проверенные AI-секции работают. Все данные отчёта можно сериализовать.

## Цель

Дать агентству безопасный способ зафиксировать отчёт и доставить клиенту одинаковую веб- и PDF-версию.

## Выполни

1. Создай миграции snapshots, share links и deliveries.
2. Реализуй транзакционную публикацию immutable snapshot.
3. Публичный viewer должен читать только snapshot.
4. Реализуй криптографический share token с hash в БД.
5. Добавь expiry, revoke, optional PIN и rate limiting.
6. Настрой privacy headers, noindex и безопасную referrer policy.
7. Генерируй PDF worker из того же snapshot и report components.
8. Ожидай явный marker готовности графиков.
9. Реализуй ручную email-доставку и delivery status.
10. Добавь retry/idempotency для PDF и email.
11. Напиши tests на snapshot immutability и token lifecycle.
12. Проверь visual parity веба и PDF.

## Ограничения

- Draft после публикации не меняет snapshot.
- Открытый token не хранится и не логируется.
- PDF не строится из отдельного набора расчётов.
- Не реализуй расписание, клиентские аккаунты и billing.

## Готово, когда

- опубликованная ссылка открывается в новой сессии;
- expiry/revoke/PIN работают;
- HTML и PDF совпадают по данным;
- графики корректно печатаются;
- повторный job безопасен;
- delivery errors наблюдаемы.

В финале перечисли публичные security controls, результаты visual regression и сценарии восстановления после ошибок.
