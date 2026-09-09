# Словарь KPI MAG — шаблон «услуги / заявки»

Версия: 0.1-hypothesis  
Дата: 2026-09-09  
Связанные решения: D-015 … D-020 в [DECISION_LOG.md](DECISION_LOG.md)

Правила для всех KPI:

- считать из агрегированных числителя и знаменателя, не среднее от отношений;
- знаменатель 0 → `null`, не 0 и не ∞;
- `null` (нет данных) ≠ `0` (измеренный ноль);
- округление только в отображении;
- методология и имя цели Метрики печатаются в отчёте.

## Реклама и заявки

| Ключ | Название | Формула | Поля-источники | Единица | Favorable | Формат | Edge cases |
| --- | --- | --- | --- | --- | --- | --- | --- |
| impressions | Показы | Σ impressions | Direct.impressions | шт. | up | integer | Нет колонки → карточка hidden |
| clicks | Клики | Σ clicks | Direct.clicks | шт. | up | integer | clicks > impressions → предупреждение импорта |
| spend | Расход | Σ spend | Direct.spend | валюта клиента | down | currency 2 знака | Смешение валют → блок |
| sessions | Визиты | Σ sessions | Metrika.sessions | шт. | up | integer | Рекламные визиты vs все визиты — указать срез в методологии |
| leads | Заявки | Σ goal_completions выбранной цели | Metrika.goal_completions | шт. | up | integer | Несколько целей: в MVP одна выбранная; Direct.conversions не подмешивать |
| ctr | CTR | clicks / impressions | clicks, impressions | доля | up | percent 2 знака | impressions = 0 → null |
| cpc | CPC | spend / clicks | spend, clicks | валюта | down | currency 2 знака | clicks = 0 → null; рост CPC = хуже |
| cvr | CVR | leads / clicks | leads, clicks | доля | up | percent 2 знака | clicks = 0 → null; знаменатель — клики, не визиты (D-015) |
| cpl | CPL | spend / leads | spend, leads | валюта | down | currency 2 знака | leads = 0 → null; рост CPL = хуже |

Не входят в шаблон v1: revenue, ROAS, ДРР, AOV, CAC, ROMI, CPM как обязательная карточка (CPM можно считать, но не показывать на первом экране).

## Сравнение периодов

- Текущий интервал задаёт пользователь.
- Прошлый = непосредственно предшествующий интервал **той же длины** (D-017).
- Абсолютная дельта = current − previous.
- Процентная дельта = delta / |previous| × 100.
- previous = 0 → процентную дельту не показывать, только абсолютную.
- Значимо для AI и бейджа: |процентная дельта| ≥ 10% (D-018).
- `assumption`: для заявок дополнительно |delta| ≥ 3, иначе 10% на 1→2 заявке даёт шум. Владелец абсолютный порог не утвердил.

Направленность: для `spend`, `cpc`, `cpl` рост процента помечается как негативный (sign + «хуже/лучше», не только цвет — D-019).

## SEO-секция

Статус: обязательна по решению владельца (D-010, D-020), не подтверждена другими пользователями.

| Ключ | Название | Формула | Источник | Единица | Favorable | Edge cases |
| --- | --- | --- | --- | --- | --- | --- |
| seo_impressions | Показы поиска (Вебмастер) | Σ query.impressions | Webmaster queries | шт. | up | Не складывать с показами Директа |
| seo_clicks | Клики Вебмастера | Σ query.clicks | Webmaster queries | шт. | up | — |
| seo_avg_position | Средняя позиция | Σ(position × impressions) / Σ impressions | Webmaster queries | позиция | down | Нет impressions → не среднее арифметическое по строкам; нет данных → null |
| seo_clicks_vs_visits | Сверка кликов и визитов | seo_clicks и organic_sessions рядом; ratio = organic_sessions / seo_clicks | Webmaster.clicks, Metrika organic sessions | шт. и ratio | nearer to 1 | organic_sessions или seo_clicks = 0 → ratio null; не утверждать причину разрыва |
| pages_in_index | Страниц в индексе | last(pages_in_index) за период или значение на конец периода | Webmaster indexation | шт. | up | Нужна дневная серия; иначе одно число без графика |
| excluded_pages | Исключено | last(excluded_pages) | Webmaster indexation | шт. | down | Определение «исключено» — `to-validate` |
| error_pages | Ошибки индексации | last(error_pages) | Webmaster indexation | шт. | down | Без сырых URL страниц |

Топ запросов: не KPI-карточка, а таблица. Сортировка по показам за текущий период. Колонки: запрос, показы, клики, средняя позиция, Δ позиции. Без персональных и бренд-запросов клиента в примерах репозитория.

## Воронка

Этапы, если поле есть в данных: показы → клики → визиты → заявки.

Между соседними: conversion rate = следующий / предыдущий. Нельзя подставлять конверсии Директа вместо заявок Метрики. Если визиты нельзя честно сопоставить кампаниям Директа, воронка строится на уровне всего отчёта, не по кампании, либо скрывается с текстом в [REPORT_SPEC.md](REPORT_SPEC.md).
