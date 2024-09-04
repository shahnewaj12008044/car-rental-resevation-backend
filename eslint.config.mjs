import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly",
      },
    },
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    rules:{
      "@typescript-eslint/no-unused-vars": "error",
      "no-unused-expressions":"error",
      "prefer-const":"error",
      "no-console":"warn",
      "no-undef":"error"

    },
    ignores:["**/node_modules/", ".dist/"]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];