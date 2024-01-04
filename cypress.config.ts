import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: process.env.TEST_BASE_URL || 'http://localhost:5173',
  },
})
