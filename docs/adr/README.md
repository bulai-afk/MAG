# Architecture Decision Records

Коротко фиксируем решения, которые нельзя «просто передумать» в коде.

| ADR                                | Решение                                                                | Статус       |
| ---------------------------------- | ---------------------------------------------------------------------- | ------------ |
| [ADR-001](001-modular-monolith.md) | Модульный монолит вместо микросервисов                                 | принято      |
| ADR-002                            | CSV-first вместо прямых интеграций                                     | запланирован |
| ADR-003                            | Immutable report snapshots                                             | запланирован |
| ADR-004                            | AI объясняет факты, но не считает KPI                                  | запланирован |
| ADR-005                            | PostgreSQL + Drizzle                                                   | запланирован |
| ADR-006                            | BullMQ worker                                                          | запланирован |
| ADR-007                            | S3-compatible private storage                                          | запланирован |
| ADR-008                            | Российский AI provider с переносимым interface                         | запланирован |
| ADR-009                            | Web report first, PDF second — уточнить по discovery (PDF-first в MVP) | запланирован |
| ADR-010                            | Tenant isolation strategy                                              | запланирован |

Формат: контекст, решение, последствия, статус. Изменения — через pull request.
