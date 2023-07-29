import { defineConfig } from 'vite';
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

const vitestConfig: VitestUserConfigInterface = {
  test: {
  }
};

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './src/setup-test.ts',
    globals: true,
    environment: 'jsdom',
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  }});