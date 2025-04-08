// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: false,
    arrowParens: "always",
    bracketSameLine: false,
    bracketSpacing: true,
    experimentalTernaries: false,
    singleQuote: false,
    jsxSingleQuote: false,
    quoteProps: "as-needed",
    singleAttributePerLine: true,
    htmlWhitespaceSensitivity: "css",
    vueIndentScriptAndStyle: true,
    proseWrap: "preserve",
    insertPragma: false,
    printWidth: 120,
    requirePragma: false,
    useTabs: false,
    embeddedLanguageFormatting: "auto",
}

export default config
