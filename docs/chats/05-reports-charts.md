# Чат 05 — Отчёты, KPI и графики

Ты работаешь только над этапом 5 MAG. Прочитай правила расчётов, модель reports и полный раздел «Графики и визуализация данных» в `docs/PROJECT_PLAN.md`. Проверь фактический контракт import pipeline.

## Входное условие

CSV pipeline стабильно создаёт канонические metric values и проверенные агрегаты.

## Цель

Реализовать редактируемый отчёт с детерминированными KPI, сравнением периодов и графиками, использующими единый источник данных.

## Выполни

1. Создай domain model и миграции reports/report sections.
2. Реализуй lifecycle draft/processing/review/published/archived.
3. Реализуй абсолютные и процентные сравнения периодов.
4. Обработай zero, null, неполный период, timezone и валюты.
5. Derived KPI считай из агрегированных числителя и знаменателя.
6. Создай backend `ChartDataset`.
7. Реализуй time series, channels, campaigns, composition и funnel.
8. Добавь top N, «Другие», period alignment и стабильные категории.
9. Свяжи KPI cards, metric switcher и channel filter.
10. Подключи редактор, preview и autosave.
11. Добавь table fallback, accessibility и print behavior.
12. Напиши unit, integration, component, visual и E2E tests.

## Ограничения

- Frontend не пересчитывает KPI.
- `null` и `0` имеют разный смысл.
- Графики и KPI используют один набор агрегатов.
- Не реализуй AI, публикацию snapshot и доставку.
- Не вводи произвольный dashboard builder.

## Готово, когда

- суммы категорий совпадают с totals;
- текущий и предыдущий периоды выровнены корректно;
- все графики работают на desktop/mobile/print;
- таблица доступна для каждого графика;
- edge cases и visual regressions покрыты тестами.

В финале покажи матрицу «метрика → формула → источник → формат», список графиков и результаты проверок.
