const { test, expect } = require('@playwright/test');
const { hantecdemoPage } = require('../support/page-object/hantecdemo.page.js');
const testData = require('../fixtures/hantec-demoaccpage-data.js');
const { hantecDemoAccData, english } = testData;

let demoPage;

test.describe('Hantec Demo Account Page Test Verification', () => {
    test.describe.configure({ mode: 'serial' });

    test.beforeEach(async ({ page, baseURL }) => {
        // Navigate to demo account page only once per test session (if needed)
        await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
        demoPage = new hantecdemoPage(page); // Pass the `page` properly
    });

    test('Verify that the Hantec demo account page loads successfully', async ({ page }) => {
        await test.step('Then the user should be on the Hantec demo account page', async () => {
            await demoPage.navigateTo(english.links.demoAccPageLink);
        });
    });

    test('Verify all key elements on the demo account page', async ({ page }) => {
        await test.step('Then the page URL should be the Hantec demo account page', async () => {
            await demoPage.validateOnPage(english.links.demoAccPageLink);
        });
        await test.step('And all key web elements and the browser tab title should be displayed correctly', async () => {
            await demoPage.verifyWebElements(english.BrowserTitle.demoAccPageTitle);
        });
    });

    test('Verify form submission with valid data', async ({ page }) => {
        await test.step('Then the user should be able to fill out and submit the demo account form successfully', async () => {
            await demoPage.nameInput.fill(`${hantecDemoAccData.firstName} ${hantecDemoAccData.lastName}`);
            await demoPage.emailInput.fill(hantecDemoAccData.email);
            await demoPage.phoneInput.fill(hantecDemoAccData.phoneNumber);
            await demoPage.submitBtn.click();
            // Add assertions for successful submission if applicable
        });
    });
});