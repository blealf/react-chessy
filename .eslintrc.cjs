module.exports = {
  "root": true,
  "env": { browser: true, es2020: true },
  "extends": [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    // "eslint:recommended",
    // "plugin:react-hooks/recommended",
    // "airbnb",
  ],
  "overrides": [],
  "ignorePatterns": ["dist", ".eslintrc.cjs"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint", "react-refresh"],
  "rules": {
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true },
    ],
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "react/jsx-filename-extension": ["warn", { "extensions": [".tsx"] }],
    "max-len": ["warn", { "code": 75, "ignoreComments": true, "ignoreUrls": true }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/prefer-default-export": "off",
    "react/prop-types": "off",
    "prettier/prettier": ["error", { "endOfLine": "auto" }],
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    },
  },
}
