// playwright.config.js
const path = require('path');


const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',             // Your spec files directory
  timeout: 30 * 1000,             // Global timeout per test
  retries: 0,                     // Set to 1 or more to retry flaky tests
  reporter: [['list'], ['html', { open: 'never' }]],

  // use: {
  //   baseURL: 'https://example.com', // Change to your app's base URL
  //   headless: false,                 // Set to false to watch tests run
  //   screenshot: 'only-on-failure',
  //   video: 'retain-on-failure',
  //   trace: 'on-first-retry',
  // },

  // Run tests in multiple browsers
  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://hmarkets.com', // ✅ must include protocol
        ignoreHTTPSErrors: true,
        headless: false, // set to false to SEE the browser
        viewport: { width: 1920, height: 1080 },
        trace: 'on-first-retry', // ✅ valid value; 'on-first-entry' is invalid
        timeout: 30 * 1000, // per test timeout },
      },
    },
    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://hmarkets.com/',
        ignoreHTTPSErrors: true,
        headless: false,
        viewport: { width: 1920, height: 1080 },
        trace: 'on-first-retry',
        timeout: 30 * 1000,
      },
    },
    {
      name: 'WebKit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'https://hmarkets.com/',
        ignoreHTTPSErrors: true,
        headless: false,
        viewport: { width: 1920, height: 1080 },
        trace: 'on-first-retry',
        timeout: 30 * 1000,
      },
    },
  ],
});