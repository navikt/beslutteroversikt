import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default tseslint.config({
	languageOptions: {
		globals: {
			...globals.browser,
			...globals.es2025
		},
		parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }
	},
	extends: [eslint.configs.recommended, tseslint.configs.recommended],
	files: ['**/*.{js,jsx,ts,tsx}'],
	plugins: {
		'jsx-a11y': jsxA11y,
		'react-hooks': reactHooks,
		'react-refresh': reactRefresh
	},
	rules: {
		...jsxA11y.flatConfigs.recommended.rules,
		...reactHooks.configs.recommended.rules,
		'react-refresh/only-export-components': 'warn',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/no-empty-object-type': 'off',
		'no-debugger': 'warn',
		'no-console': 'warn'
	}
});
