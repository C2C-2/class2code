module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "standard",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "linebreak-style": 0,
    quotes: ["error", "double"],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        // imports: "never",
        // exports: "never",
        // functions: "never",
      },
    ],
    "operator-linebreak": 0,
    semi: ["error", "always", { omitLastInOneLineClassBody: true }],
    "space-before-function-paren": ["error", "never"],
  },
};
