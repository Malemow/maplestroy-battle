// .eslintrc.js
import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tsEslint from "typescript-eslint"
import prettierConfig from "eslint-config-prettier"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import prettier from "eslint-plugin-prettier"

export default tsEslint.config(
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, ...tsEslint.configs.recommended, eslintPluginPrettierRecommended],
        files: ["**/*.{ts,tsx,mjs,js,json}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            prettier,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            "prettier/prettier": "error", // 可以設置 Prettier 規則為 error
        },
    },
    prettierConfig
)
