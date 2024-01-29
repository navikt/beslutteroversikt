import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		manifest: 'asset-manifest.json',
		sourcemap: true,
		target: 'esnext'
	},
	plugins: [react()],
	test: {
		globals: true
	}
});
