import js from "@eslint/js";
import globals from "globals";

export default [
  // Include ESLint recommended rules the correct Flat way
  js.configs.recommended,

  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["node_modules/"],

    languageOptions: {
      globals: {
        ...globals.node
      }
    },

    rules: {
      // optional custom rules here
    }
  }
];
