import js from '@eslint/js';
import globals from 'globals';
export default [
  { ignores: ['**/node_modules/**', '**/coverage/**', '**/dist/**'] },
  {
    files: ['server/**/*.js'],
    languageOptions: { globals: { ...globals.node, ...globals.jest } },
    rules: { ...js.configs.recommended.rules, 'no-unused-vars': 'warn' },
  },
  {
    files: ['client/src/**/*.{js,jsx}', 'client/vite.config.js'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: { ...js.configs.recommended.rules, 'no-unused-vars': 'warn' },
  },
];
