import { config as loadDotenv } from "dotenv";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

export function findRepoRoot(startDir = process.cwd()): string {
  let directory = startDir;

  while (true) {
    if (existsSync(resolve(directory, "pnpm-workspace.yaml"))) {
      return directory;
    }

    const parent = dirname(directory);
    if (parent === directory) {
      throw new Error("MAG repository root was not found (missing pnpm-workspace.yaml).");
    }

    directory = parent;
  }
}

export function loadRootEnv(startDir = process.cwd()): void {
  const envPath = resolve(findRepoRoot(startDir), ".env");
  loadDotenv({ path: envPath, override: false, quiet: true });
}
