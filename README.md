# @khanhtran47/config

This is my personal [ESLint][eslint], [Prettier][prettier], and [TypeScript][typescript] configuration. It is a shareable configuration that can be used in any JavaScript or TypeScript project.

[![npm][npm-image]][npm-url]

<!-- [![ci][ci-image]][ci-url]
[![changesets][changesets-image]][changesets-url] -->

## Install

```bash
npm install --save-dev @khanhtran47/config
```

> Be sure to install the appropriately versioned of `eslint` and `prettier` peer dependency as well.

## Usage

Follow the ESLint documentation on [shared configurations][eslint-sharing]. See the documentation on
[ignoring files][eslint-ignores] if you need to ignore anything the config doesn't already ignore by
default.

Follow the Prettier documentation on [sharing configurations][prettier-sharing].

## Examples

### ESlint

Create a `eslint.config.js` file in your project root with the following content:

```js
import { config as defaultConfig } from '@khanhtran47/config/eslint';

/** @type {import("eslint").Linter.Config[]} */
const config = [
 ...defaultConfig,
 // overrides here
];

export default config;
```

### Prettier

#### `package.json`

```json
{
  "prettier": "@khanhtran47/config/prettier",
  "scripts": {
    ...
    "lint": "eslint --cache --cache-location ./node_modules/.cache/eslint .",
    "format": "prettier --cache --write .",
    "format:check": "prettier --cache --check .",
    ...
  }
}
```

If you need to customize the configuration, you can use a dedicated Prettier config file instead of
the one-liner in package.json:

#### `prettier.config.js`

```js
import { config as defaultConfig } from '@khanhtran47/config/prettier';

/** @type {import("prettier").Options} */
export const config = {
 ...defaultConfig,
 // overrides here
};

export default config;
```

### TypeScript

Create a `tsconfig.json` file in your project root with the following content:

```json
{
  "extends": ["@khanhtran47/config/typescript"],
  "compilerOptions": {
    // overrides here
  }
}
```

[npm-image]: https://img.shields.io/npm/v/@khanhtran47/config.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@khanhtran47/config

<!-- [ci-image]: https://img.shields.io/github/actions/workflow/status/khanhtran47/config/ci.yml?logo=github&style=flat-square
[ci-url]: https://github.com/khanhtran47/config/actions?query=workflow%3Aci
[changesets-image]: https://img.shields.io/badge/maintained%20with-changesets-blue?style=flat-square
[changesets-url]: https://github.com/changesets/changesets -->

[eslint]: https://eslint.org/
[eslint-sharing]: https://eslint.org/docs/latest/use/configure/configuration-files#using-a-shareable-configuration-package
[eslint-ignores]: https://eslint.org/docs/latest/use/configure/migration-guide#ignoring-files
[prettier]: https://prettier.io/
[prettier-sharing]: https://prettier.io/docs/en/configuration.html#sharing-configurations
[typescript]: https://www.typescriptlang.org/
