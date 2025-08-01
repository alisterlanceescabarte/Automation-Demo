const { test, expect } = require('@playwright/test');
const { hantecdemoPage } = require('../support/page-object/hantecdemo.page.js');
const testData = require('../fixtures/hantec-demoaccpage-data.js');
const { hantecDemoAccData, english, countrySelectors } = testData;

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
            await demoPage.navigateTo(english.links.demoPageLink);
        });
    });

    test('Verify all key elements on the demo account page', async ({ page }) => {
        await test.step('Then the page URL should be the Hantec demo account page', async () => {
            await demoPage.navigateTo(english.links.demoPageLink);
            await demoPage.validateOnPage(english.links.demoPageLink);
        });
        await test.step('And all key web elements and the browser tab title should be displayed correctly', async () => {
            await demoPage.verifyWebElements(test, english.BrowserTitle.demoPageTitle, english.text.languageBtnLabel);
        });
    });

    test('Verify all links on key web elements', async ({ page }) => {
        await test.step('Then all links associated with key web elements should be valid and functional', async () => {
            // Pass only relevant parts of the fixture
            await demoPage.verifyDemopageLinksUsingFixture(test, english.text, english.links);
        });
    });

    test('Verify the required fields when creating a demo account', async ({ page }) => {
        await test.step('Then all the required fields should be displayed properly', async () => {
            await demoPage.navigateTo(english.links.demoPageLink);
            await demoPage.verifyrequiredFields(english.text);
        });
    });

    test('Verify form submission with no data being populated', async ({ page }) => {
        await test.step('Then the user should encounter validation errors in the required fields', async () => {
            await demoPage.navigateTo(english.links.demoPageLink);
            await demoPage.requiredFieldsValidation(english.errorValidationText);
        });
    });
    test('Verify submission of valid demo account', async ({ page }) => {
        await test.step('Then the user should successfully open a demo account', async () => {
            await demoPage.navigateTo(english.links.demoPageLink);
            await demoPage.submitValidAcc(hantecDemoAccData);
        });
    });
});