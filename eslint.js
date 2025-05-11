import eslint from '@eslint/js';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import playwright from 'eslint-plugin-playwright';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import storybook from 'eslint-plugin-storybook';
import tailwindcss from 'eslint-plugin-tailwindcss';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const ERROR = 'error';
const WARN = 'warn';
const OFF = 'off';

function has(pkgName) {
	try {
		import.meta.resolve(pkgName, import.meta.url);
		return true;
	} catch {
		return false;
	}
}

const hasReact = has('react');
const hasTypeScript = has('typescript');
const hasTestingLibrary = has('@testing-library/dom');
const hasJestDom = has('@testing-library/jest-dom');
const hasVitest = has('vitest');
const hasPlaywright = has('@playwright/test');
const hasStorybook = has('@storybook/react');

const vitestFiles = ['**/__tests__/**/*', '**/*.test.*'];
const testFiles = ['**/tests/**', '**/#tests/**', ...vitestFiles];
const allPlaywrightFiles = ['**/playwright/**'];
const playwrightTestFiles = ['**/playwright/**/*.spec.*'];
const storybookFiles = ['**/storybook/**', '**/stories/**', '**/story/**'];

export const config = [
	// global ignores
	globalIgnores([
		'**/.cache/**',
		'**/.react-router/**',
		'**/node_modules/**',
		'**/build/**',
		'**/public/build/**',
		'**/playwright-report/**',
		'**/playwright-results/**',
		'**/playwright/report/**',
		'**/playwright/results/**',
		'**/server-build/**',
		'**/dist/**',
		'**/coverage/**',
		'**/.vscode/**',
		'**/*.json',
		'**/*.lock',
		'**/*.yaml',
		'**/*.log',
		'**/*.config.js',
		'**/*.config.cjs',
		'**/*.config.mjs',
		'**/*.config.ts',
		'app/components/ui/icons/*.d.ts',
		'app/components/ui/icons/*.md',
	]),

	// all files
	{
		plugins: {
			import: (await import('eslint-plugin-import-x')).default,
			eslint: eslint,
			tailwindcss: tailwindcss,
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			...eslint.configs.recommended.rules,
			'import/no-duplicates': [WARN, { considerQueryString: true }],
			'import/order': OFF, // handled automatically by Prettier
			'arrow-body-style': OFF,
			'comma-dangle': OFF,
			'consistent-return': OFF,
			'func-names': OFF,
			'max-len': OFF,
			'no-alert': OFF,
			'no-console': [
				WARN,
				{
					allow: ['warn', 'error'],
				},
			],
			'no-debugger': OFF,
			'no-nested-ternary': OFF,
			'no-empty-function': OFF,
			'no-param-reassign': [
				ERROR,
				{
					props: false,
				},
			],
			'no-shadow': OFF,
			'no-throw-literal': OFF,
			'no-underscore-dangle': OFF,
			'no-unused-expressions': [
				ERROR,
				{
					allowShortCircuit: true,
					allowTernary: true,
					enforceForJSX: false,
				},
			],
			'no-mixed-spaces-and-tabs': OFF,
			'no-undef': OFF,
			'no-constant-binary-expression': OFF,
			'prefer-const': [
				ERROR,
				{
					destructuring: 'all',
				},
			],
			quotes: [
				ERROR,
				'single',
				{
					avoidEscape: true,
					allowTemplateLiterals: true,
				},
			],
			radix: OFF,
			'space-before-function-paren': [
				ERROR,
				{
					anonymous: 'always',
					named: 'never',
					asyncArrow: 'always',
				},
			],
			'sort-imports': OFF,
			'tailwindcss/no-custom-classname': OFF,
		},
		settings: {
			tailwindcss: {
				callees: ['tv', 'classNames', 'cn'],
			},
		},
	},
	prettierRecommended,
	{
		rules: {
			'prettier/prettier': [
				ERROR,
				{
					arrowParens: 'always',
					bracketSameLine: false,
					bracketSpacing: true,
					embeddedLanguageFormatting: 'auto',
					endOfLine: 'auto',
					htmlWhitespaceSensitivity: 'css',
					insertPragma: false,
					jsxSingleQuote: false,
					printWidth: 100,
					proseWrap: 'always',
					quoteProps: 'as-needed',
					requirePragma: false,
					semi: true,
					singleAttributePerLine: false,
					singleQuote: true,
					tabWidth: 2,
					trailingComma: 'all',
					useTabs: true,
				},
			],
		},
	},

	// JSX/TSX files
	hasReact
		? {
				files: ['**/*.tsx', '**/*.jsx'],
				plugins: {
					react,
					'jsx-a11y': jsxA11Y,
				},
				languageOptions: {
					parserOptions: {
						ecmaFeatures: {
							jsx: true,
						},
					},
				},
				rules: {
					...react.configs.recommended.rules,
					...jsxA11Y.configs.recommended.rules,
					'react/function-component-definition': [
						'error',
						{
							namedComponents: 'function-declaration',
							unnamedComponents: 'arrow-function',
						},
					],
					'react/react-in-jsx-scope': OFF,
					'react/prop-types': OFF,
					'react/display-name': [
						ERROR,
						{
							ignoreTranspilerName: false,
						},
					],
					'react/jsx-filename-extension': [
						WARN,
						{
							extensions: ['.tsx'],
						},
					],
					'react/jsx-props-no-spreading': OFF,
					'react/forbid-prop-types': OFF,
					'react/no-array-index-key': OFF,
					'react/function-component-definition': OFF,
					'react/no-unescaped-entities': OFF,
					'react/prefer-stateless-function': OFF,
					'react/jsx-sort-props': [
						ERROR,
						{
							ignoreCase: true,
							callbacksLast: true,
							shorthandFirst: true,
							multiline: 'last',
							noSortAlphabetically: false,
							reservedFirst: true,
						},
					],
					'react/react-in-jsx-scope': OFF,
					'react/require-default-props': OFF,
					'jsx-a11y/label-has-associated-control': [
						ERROR,
						{
							assert: 'either',
						},
					],
					'jsx-a11y/accessible-emoji': OFF,
					'jsx-a11y/anchor-is-valid': [
						WARN,
						{
							aspects: ['invalidHref'],
						},
					],
					'jsx-a11y/href-no-hash': OFF,
					'jsx-a11y/heading-has-content': OFF,
					'jsx-a11y/anchor-has-content': OFF,
				},
				settings: {
					react: {
						version: 'detect',
					},
					'import-x/resolver-next': [createTypeScriptImportResolver({})],
				},
			}
		: {},

	// react-hook rules are applicable in ts/js/tsx/jsx, but only with React as a dep
	hasReact
		? {
				files: ['**/*.ts?(x)', '**/*.js?(x)'],
				ignores: [...allPlaywrightFiles],
				plugins: {
					'react-hooks': (await import('eslint-plugin-react-hooks')).default,
				},
				rules: {
					'react-hooks/rules-of-hooks': ERROR,
					'react-hooks/exhaustive-deps': WARN,
					'react-hooks/react-compiler': WARN,
				},
			}
		: {},

	// JS, JSX, and CJS files
	{
		files: ['**/*.{js,jsx,cjs}'],
		// most of these rules are useful for JS but not TS because TS handles these better
		rules: {
			// Blocked by https://github.com/import-js/eslint-plugin-import/issues/2132
			// 'import/no-unresolved': [
			//   ERROR,
			//   {
			//     ignore: ['^#icons/icon', '^~/icons/icon', './icons-sprite.svg'],
			//   },
			// ],
			'no-unused-vars': [
				WARN,
				{
					args: 'after-used',
					argsIgnorePattern: '^_',
					ignoreRestSiblings: true,
					varsIgnorePattern: '^ignored',
				},
			],
		},
	},

	// TS and TSX files
	...(hasTypeScript
		? [
				{
					files: ['**/*.ts?(x)'],
					languageOptions: {
						parser: (await import('typescript-eslint')).parser,
						parserOptions: {
							projectService: true,
						},
					},
					plugins: {
						import: (await import('eslint-plugin-import-x')).default,
						'@typescript-eslint': (await import('typescript-eslint')).plugin,
					},
					rules: {
						...tseslint.configs.recommended.rules,
						// '@typescript-eslint/ban-ts-comment': OFF,
						'@typescript-eslint/consistent-type-definitions': OFF,
						// Note: use this rule _OR_ verbatimModuleSyntax in tsconfig.json - not both
						'@typescript-eslint/consistent-type-imports': [
							ERROR,
							{
								prefer: 'type-imports',
								disallowTypeAnnotations: true,
								fixStyle: 'inline-type-imports',
							},
						],
						'@typescript-eslint/explicit-module-boundary-types': OFF,
						'@typescript-eslint/naming-convention': [
							ERROR,
							{
								selector: 'typeLike',
								format: ['PascalCase'],
								custom: { regex: '^I[A-Z]', match: false },
							},
						],
						'@typescript-eslint/no-explicit-any': OFF,
						'@typescript-eslint/no-floating-promises': [
							ERROR,
							{
								ignoreIIFE: true,
							},
						],
						'@typescript-eslint/no-import-type-side-effects': ERROR,
						'no-invalid-this': OFF,
						'@typescript-eslint/no-invalid-this': ERROR,
						'no-redeclare': OFF,
						'@typescript-eslint/no-non-null-assertion': OFF,
						'@typescript-eslint/no-redeclare': ERROR,
						'no-shadow': OFF,
						'@typescript-eslint/no-shadow': OFF,
						'@typescript-eslint/no-unnecessary-type-constraint': WARN,
						'no-use-before-define': OFF,
						'@typescript-eslint/no-use-before-define': [
							ERROR,
							{
								functions: false,
								classes: true,
								variables: true,
							},
						],
						'@typescript-eslint/prefer-nullish-coalescing': OFF,
						'@typescript-eslint/restrict-template-expressions': [
							ERROR,
							{
								allowBoolean: true,
								allowNullish: true,
							},
						],
						'@typescript-eslint/require-await': OFF,
						'@typescript-eslint/unified-signatures': WARN,
						'no-unused-vars': OFF,
						'@typescript-eslint/no-unused-vars': [
							WARN,
							{
								vars: 'all',
								args: 'all',
								argsIgnorePattern: '^_',
								destructuredArrayIgnorePattern: '^_',
								ignoreRestSiblings: false,
							},
						],
						'@typescript-eslint/triple-slash-reference': OFF,
						'@typescript-eslint/no-empty-function': OFF,
						'@typescript-eslint/no-empty-interface': OFF,
						'@typescript-eslint/no-explicit-any': OFF,
						'import/no-named-as-default': OFF,
						'import/no-named-as-default-member': OFF,
						'import/no-cycle': ERROR,
						'import/prefer-default-export': OFF,
						'import/extensions': [
							ERROR,
							'ignorePackages',
							{
								ts: 'never',
								tsx: 'never',
							},
						],
						'import/no-extraneous-dependencies': [
							ERROR,
							{
								devDependencies: true,
							},
						],
					},
					settings: {
						'import-x/resolver-next': [
							createTypeScriptImportResolver({
								alwaysTryTypes: true,
								extensions: ['.ts', '.tsx'],
							}),
						],
					},
				},
			]
		: []),

	// This assumes test files are those which are in the test directory or have
	// *.test.* in the filename. If a file doesn't match this assumption, then it
	// will not be allowed to import test files.
	{
		files: ['**/*.ts?(x)', '**/*.js?(x)'],
		ignores: testFiles,
		rules: {
			'no-restricted-imports': [
				ERROR,
				{
					patterns: [
						{
							group: testFiles,
							message: 'Do not import test files in source files',
						},
					],
				},
			],
		},
	},

	hasTestingLibrary
		? {
				files: testFiles,
				ignores: [...playwrightTestFiles],
				plugins: {
					'testing-library': (await import('eslint-plugin-testing-library')).default,
				},
				rules: {
					'testing-library/await-async-events': ERROR,
					'testing-library/await-async-queries': ERROR,
					'testing-library/await-async-utils': ERROR,
					'testing-library/consistent-data-testid': OFF,
					'testing-library/no-await-sync-events': ERROR,
					'testing-library/no-await-sync-queries': ERROR,
					'testing-library/no-container': ERROR,
					'testing-library/no-debugging-utils': OFF,
					'testing-library/no-dom-import': [ERROR, 'react'],
					'testing-library/no-global-regexp-flag-in-query': ERROR,
					'testing-library/no-manual-cleanup': ERROR,
					'testing-library/no-node-access': ERROR,
					'testing-library/no-promise-in-fire-event': ERROR,
					'testing-library/no-render-in-lifecycle': ERROR,
					'testing-library/no-unnecessary-act': ERROR,
					'testing-library/no-wait-for-multiple-assertions': ERROR,
					'testing-library/no-wait-for-side-effects': ERROR,
					'testing-library/no-wait-for-snapshot': ERROR,
					'testing-library/prefer-explicit-assert': ERROR,
					'testing-library/prefer-find-by': ERROR,
					'testing-library/prefer-presence-queries': ERROR,
					'testing-library/prefer-query-by-disappearance': ERROR,
					'testing-library/prefer-query-matchers': OFF,
					'testing-library/prefer-screen-queries': ERROR,
					'testing-library/prefer-user-event': ERROR,
					'testing-library/render-result-naming-convention': ERROR,
				},
			}
		: {},

	hasJestDom
		? {
				files: testFiles,
				ignores: [...playwrightTestFiles],
				plugins: {
					'jest-dom': (await import('eslint-plugin-jest-dom')).default,
				},
				rules: {
					'jest-dom/prefer-checked': ERROR,
					'jest-dom/prefer-empty': ERROR,
					'jest-dom/prefer-enabled-disabled': ERROR,
					'jest-dom/prefer-focus': ERROR,
					'jest-dom/prefer-in-document': ERROR,
					'jest-dom/prefer-required': ERROR,
					'jest-dom/prefer-to-have-attribute': ERROR,
					'jest-dom/prefer-to-have-class': ERROR,
					'jest-dom/prefer-to-have-style': ERROR,
					'jest-dom/prefer-to-have-text-content': ERROR,
					'jest-dom/prefer-to-have-value': ERROR,
				},
			}
		: {},

	hasVitest
		? {
				files: testFiles,
				ignores: [...playwrightTestFiles],
				plugins: {
					vitest: (await import('@vitest/eslint-plugin')).default,
				},
				rules: {
					// you don't want the editor to autofix this, but we do want to be
					// made aware of it
					'vitest/no-focused-tests': [WARN, { fixable: false }],
				},
			}
		: {},

	hasPlaywright
		? {
				files: playwrightTestFiles,
				...playwright.configs['flat/recommended'],
			}
		: {},

	hasStorybook
		? {
				files: storybookFiles,
				plugins: {
					storybook: storybook,
				},
				rules: {
					...storybook.configs.recommended.rules,
				},
			}
		: {},
].filter(Boolean);

// This is for backward compatibility
export default config;
