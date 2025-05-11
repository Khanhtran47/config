/** @type {import("prettier").Options} */
export const config = {
	$schema: 'http://json.schemastore.org/prettierrc',

	// defaults
	arrowParens: 'always',
	bracketSameLine: false,
	bracketSpacing: true,
	embeddedLanguageFormatting: 'auto',
	htmlWhitespaceSensitivity: 'css',
	insertPragma: false,
	jsxSingleQuote: false,
	quoteProps: 'as-needed',
	rangeEnd: Infinity,
	rangeStart: 0,
	requirePragma: false,
	semi: true,
	singleAttributePerLine: false,
	tabWidth: 2,
	trailingComma: 'all',
	vueIndentScriptAndStyle: false,

	// customized
	printWidth: 100,
	singleQuote: true,
	endOfLine: 'auto',
	useTabs: true,
	proseWrap: 'always',

	overrides: [
		// formatting the package.json with anything other than spaces will cause
		// issues when running install...
		{
			files: ['**/package.json'],
			options: {
				useTabs: false,
			},
		},
		{
			files: ['**/*.md', '**/*.mdx'],
			options: {
				// This stinks, if you don't do this, then an inline component on the
				// end of the line will end up wrapping, then the next save prettier
				// will add an extra line break. Super annoying and probably a bug in
				// prettier, but until it's fixed, this is the best we can do.
				proseWrap: 'preserve',
				htmlWhitespaceSensitivity: 'ignore',
			},
		},
	],

	// plugins
	plugins: [
		'@ianvs/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss',
		'prettier-plugin-sort-json',
	],
	importOrder: [
		'<BUILTIN_MODULES>',
		'^(react/(.*)$)|^(react$)',
		'<THIRD_PARTY_MODULES>',
		'',
		'^~/routes/(.*)$',
		'^~/services/(.*)$',
		'^~/utils/(.*)$',
		'^~/context/(.*)$',
		'^~/store/(.*)$',
		'^~/constants/(.*)$',
		'^~/components/layouts/(.*)$',
		'^~/components/media/(.*)$',
		'^~/components/ui/(.*)$',
		'^~/components/styles/(.*)$',
		'^~/components/(.*)$',
		'^~/assets/(.*)$',
		'^~/styles/(.*)$',
		'',
		'^[./]',
		'',
		'<TYPES>^(node:)',
		'<TYPES>',
		'<TYPES>^[~]',
		'<TYPES>^[.]',
	],
	importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
	importOrderTypeScriptVersion: '5.0.0',
	tailwindAttributes: ['class', 'className', '.*[cC]lassName'],
	tailwindFunctions: ['clsx', 'cn'],
};
