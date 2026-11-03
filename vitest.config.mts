import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // localStorage / window are read by the backend resolution.
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
  },
});
