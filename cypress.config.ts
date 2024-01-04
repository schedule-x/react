import { defineConfig } from 'cypress'

let baseUrl = process.env.TEST_BASE_URL
if (!baseUrl) {
  baseUrl = 'http://localhost:5173'
}

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: baseUrl
  },
})
