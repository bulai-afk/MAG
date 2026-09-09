export const domainModules = [
  "identity",
  "agencies",
  "clients",
  "imports",
  "analytics",
  "reports",
  "narratives",
  "delivery",
  "billing",
] as const;

export type DomainModule = (typeof domainModules)[number];
