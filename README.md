# @khanhtran47/eslint-config

This is my personal [ESLint][eslint] configuration. It is a shareable configuration that can be used in any JavaScript or TypeScript project.

[![npm][npm-image]][npm-url]
[![ci][ci-image]][ci-url]
[![changesets][changesets-image]][changesets-url]

## Install

```bash
npm install --save-dev @khanhtran47/eslint-config
```

> Be sure to install the appropriately versioned `eslint` peer dependency as well.

## Usage

Follow the ESLint documentation on [shared configurations][eslint-sharing]. See the documentation on
[ignoring files][eslint-ignores] if you need to ignore anything the config doesn't already ignore by
default.

## Examples

### `eslint.config.js`

```js
import baseConfig from '@khanhtran47/eslint-config';

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...baseConfig,
  // overrides here
];

export default config;
```

### `package.json`

```json
{
  "scripts": {
    ...
    "lint": "eslint --cache --cache-location ./node_modules/.cache/eslint .",
    ...
  }
}
```

[npm-image]: https://img.shields.io/npm/v/@khanhtran47/eslint-config.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@khanhtran47/eslint-config
[ci-image]:
  https://img.shields.io/github/actions/workflow/status/khanhtran47/eslint-config/ci.yml?logo=github&style=flat-square
[ci-url]: https://github.com/khanhtran47/eslint-config/actions?query=workflow%3Aci
[changesets-image]: https://img.shields.io/badge/maintained%20with-changesets-blue?style=flat-square
[changesets-url]: https://github.com/changesets/changesets
[eslint]: https://eslint.org/
[eslint-sharing]:
  https://eslint.org/docs/latest/use/configure/configuration-files#using-a-shareable-configuration-package
[eslint-ignores]: https://eslint.org/docs/latest/use/configure/migration-guide#ignoring-files
