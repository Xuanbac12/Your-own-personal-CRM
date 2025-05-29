import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Quan trọng: cho phép document, window
    setupFiles: './src/setupTests.ts', // Đường dẫn setup test
  },
});
