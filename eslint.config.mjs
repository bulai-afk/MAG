import { magNodeEslintConfig } from "./packages/config/eslint/index.js";

export default [
  ...magNodeEslintConfig,
  {
    ignores: ["**/next-env.d.ts"],
  },
];
