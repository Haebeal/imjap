import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  // *.d.tsは無視するように
  {
    ignores: ["**/*.d.ts", "!.storybook", ".gitignore", "app/components/ui/*"],
  },
  // 全体項目設定
  {
    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "arrow-body-style": ["error", "as-needed"],
      "prefer-arrow-callback": "error",
      "no-console": "warn",
    },
  },
  // 推薦項目の設定
  eslint.configs.recommended,
  // TypeScript 向け設定
  ...tseslint.configs.recommended,
  // Prettierとの競合項目を回避
  prettier,
];
