const fs = require('fs');
const { expect } = require('@playwright/test');
let page;

async function beforeAllSetup({ browser, baseURL }) {
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    page = await context.newPage();

    await page.goto(`${baseURL}`, { waitUntil: 'networkidle' });
    await path.expect(page).toHaveURL(`${baseURL}`);
}

module.exports = { beforeAllSetup };