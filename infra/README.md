# Инфраструктура

Локальные PostgreSQL и Redis описываются корневым [`compose.yaml`](../compose.yaml). Kubernetes и отдельные микросервисы не используются.

Образы приложений web/worker появятся ближе к staging (этап 8). До этого web и worker запускаются через `pnpm dev` / `pnpm build`.
