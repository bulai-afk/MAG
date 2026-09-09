# Чат 03 — Identity, агентства и tenant isolation

Ты работаешь только над этапом 3 MAG. Прочитай архитектуру, модель данных и раздел безопасности в `docs/PROJECT_PLAN.md`. Проверь принятые ADR и существующий UI.

## Входное условие

Bootstrap стабилен, миграции можно запускать локально, UI happy path согласован.

## Цель

Реализовать безопасные аккаунты, рабочие пространства агентств, участников, клиентов и брендинг без доступа между tenant.

## Выполни

1. Выбери и документируй auth flow для российского рынка.
2. Реализуй users, sessions и подтверждение email.
3. Реализуй agencies и memberships с ролями owner/member.
4. Создай `TenantContext`, permission service и tenant-scoped repositories.
5. Реализуй clients и brand themes.
6. Подключи реальные формы onboarding и клиентов к application services.
7. Добавь audit events для важных команд.
8. Защити Server Actions/Route Handlers.
9. Реализуй rate limiting для auth.
10. Напиши integration tests на cross-tenant read/write и IDOR.

## Ограничения

- UI и API не обращаются к ORM напрямую.
- Нельзя доверять `agencyId` из формы или URL без проверки membership.
- Не добавляй клиентские аккаунты и billing.
- Не логируй session token, пароль или полный email.

## Готово, когда

- регистрация и onboarding работают end-to-end;
- owner/member permissions определены и протестированы;
- пользователь не читает и не изменяет чужие сущности;
- soft deletion и audit работают;
- security и integration tests проходят.

В финале перечисли permission matrix, миграции, security-тесты и все известные риски.
