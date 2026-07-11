import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['packages/__tests__/**/*.test.ts'],
  },
})
