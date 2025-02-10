import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
	languageOptions: {
		globals: {
			...globals.browser,
			...globals.es2025
		},
		parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }
	},
	files: ['**/*.{js,jsx,ts,tsx}'],
	plugins: {
		'jsx-a11y': jsxA11y,
		react: reactPlugin,
		'react-hooks': reactHooks,
		'react-refresh': reactRefresh
	},
	rules: {
		...jsxA11y.flatConfigs.recommended.rules,
		...reactPlugin.configs.recommended.rules,
		...reactPlugin.configs['jsx-runtime'].rules, // React >=17
		...reactHooks.configs.recommended.rules,
		'react-refresh/only-export-components': 'warn',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/no-empty-object-type': 'off',
		'no-debugger': 'warn',
		'no-console': 'warn'
	},
	settings: {
		react: {
			version: 'detect' // reactPlugin trenger å vite dette
		}
	}
});
