# Чат 02 — UI foundation и дизайн-система

Ты работаешь только над этапом 2 MAG. Прочитай `docs/PROJECT_PLAN.md`, особенно UX, дизайн-систему и раздел о графиках. Изучи результаты discovery и текущий frontend skeleton.

## Входное условие

Этап 1 завершён: monorepo запускается, проверки проходят, есть утверждённые CSV/KPI и структура отчёта.

## Цель

Собрать полный happy path на реалистичных fixture-данных до подключения backend.

## Выполни

1. Зафиксируй user flow и wireframes.
2. Настрой Tailwind и shadcn/ui без дублирования дизайн-токенов.
3. Реализуй AppShell, навигацию и базовые layout-компоненты.
4. Сверстай onboarding, клиентов, import wizard, редактор отчёта и client preview.
5. Создай KPI cards и все графики MVP на fixture datasets.
6. Реализуй состояния loading, empty, partial, error, all-zero и one-point.
7. Добавь table fallback для каждого графика.
8. Сделай адаптивный публичный отчёт.
9. Настрой print stylesheet и макет PDF.
10. Проверь keyboard navigation, contrast и reduced motion.
11. Добавь component и visual tests ключевых состояний.

## Ограничения

- Используй fixture data; не создавай временный псевдо-backend, который придётся поддерживать.
- Не реализуй auth, БД, CSV processing или AI.
- Не вводи свободный drag-and-drop конструктор.
- Текущий и предыдущий периоды должны визуально различаться не только цветом.

## Готово, когда

- happy path проходим без backend;
- интерфейс покрывает критические состояния;
- графики работают на desktop/mobile и имеют таблицы;
- print preview совпадает со структурой веб-отчёта;
- accessibility и visual tests проходят.

В финале приложи список реализованных маршрутов, компонентов, состояний и результаты визуальной проверки.
