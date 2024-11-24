module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "spellcheck", "only-warn", "import"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/eslint-recommended", "plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/recommended-requiring-type-checking"],
  "rules": {
    "eol-last": "warn",
    "no-extra-semi": "off",
    "@typescript-eslint/no-extra-semi": "warn",
    "no-return-await": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "no-console": "warn",
    "prefer-const": "warn",
    "spellcheck/spell-checker": [
      "warn",
      {
        "comments": true,
        "strings": false,
        "identifiers": false,
        "lang": "en_US",
        "skipWords": [
          "typescript",
          "eslint",
          "plugin",
          "config",
          "json",
          "npm",
          "const",
        ],
        "skipIfMatch": ["http(s)?://[^s]*", "^#"],
        "minLength": 4
      }
    ],
  },
  "overrides": [
    {
      "files": ["*.ts"],
      "rules": {
        "no-console": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "warn"
      }
    }
  ],
  "settings": {
    "import/resolver": {
      "alias": [
        ['config', './src/config'],
        ['common', './src/common']
      ]
    }
  },  
  "parserOptions": {
    "project": "./tsconfig.json",
    "tsconfigRootDir": "./"
  }
}

