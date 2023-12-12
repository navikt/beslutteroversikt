export default [
	{
		env: {
			browser: true,
			es2021: true,
			node: true
		},
		extends: [
			'eslint:recommended',
			'plugin:jsx-a11y/recommended',
			'plugin:react/recommended',
			'plugin:react-hooks/recommended',
			'plugin:@typescript-eslint/recommended',
			'prettier'
		],
		parser: '@typescript-eslint/parser',
		parserOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module'
		},
		plugins: ['react', '@typescript-eslint'],
		rules: { 'no-debugger': 'error', 'no-console': 'error' }
	}
];
