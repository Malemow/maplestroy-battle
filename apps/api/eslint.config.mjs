// eslint.config.js
import js from "@eslint/js"
import globals from "globals"
import prettierPlugin from "eslint-plugin-prettier"
import eslint from "@eslint/js"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import tsEslint from "typescript-eslint"

const flatConfig = [
    {
        ignores: ["dist"],
    },
    {
        files: ["**/*.{js,ts,tsx,mjs,json}"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            "prettier/prettier": "error",
        },
    },
]

export default tsEslint.config(
    eslint.configs.recommended,
    ...flatConfig,
    ...tsEslint.configs.recommended,
    eslintPluginPrettierRecommended
)
