import { loadEnvFile } from 'node:process';
import { defineConfig, devices } from '@playwright/test';

try {
  loadEnvFile();
} catch (error) {
  if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
    throw error;
  }
}

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://www.saucedemo.com/',
    testIdAttribute: 'data-test',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
