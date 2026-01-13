// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'
// import { defineConfig, globalIgnores } from 'eslint/config'

// export default defineConfig([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{ts,tsx}'],
//     extends: [
//       js.configs.recommended,
//       tseslint.configs.recommended,
//       reactHooks.configs.flat.recommended,
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//   },
// ])

import js from "@eslint/js";
import globals from "globals";

import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";

import tseslint from "typescript-eslint";

import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  /**
   * ignorePatterns
   */
  globalIgnores(["dist", ".eslintrc.cjs"]),

  {
    files: ["**/*.{ts,tsx}"],

    /**
     * languageOptions (env + parser + parserOptions)
     */
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    /**
     * plugins (flat requires objects, not strings)
     */
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tseslint.plugin,
      import: importPlugin,
      prettier,
    },

    /**
     * extends (flat equivalents)
     */
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      react.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
      importPlugin.configs.flat.recommended,
      prettier.configs.recommended,
    ],

    /**
     * settings
     */
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {},
      },
    },

    /**
     * rules
     */
    rules: {
      /**
       * react-refresh
       */
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      /**
       * stylistic rules
       */
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "max-len": [
        "warn",
        { code: 75, ignoreComments: true, ignoreUrls: true },
      ],

      /**
       * react rules
       */
      "react/jsx-filename-extension": [
        "warn",
        { extensions: [".tsx"] },
      ],
      "react/prop-types": "off",

      /**
       * react-hooks
       */
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /**
       * import
       */
      "import/prefer-default-export": "off",

      /**
       * prettier
       */
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
]);
