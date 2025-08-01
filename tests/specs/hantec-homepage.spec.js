const { test, expect } = require('@playwright/test');
const { hantechomePage } = require('../support/page-object/hantechome.page.js');
const testData = require('../fixtures/hantec-homepage-data.js');
const { english, countrySelectors } = testData;

let homePage;

test.describe('Hantec HomePage Test Verification', () => {
    test.describe.configure({ mode: 'serial' });

    test.beforeEach(async ({ page, baseURL }) => {
        // Navigate to homepage only once per test session (if needed)
        await page.goto(baseURL, { waitUntil: 'domcontentloaded' }); // Or use homePageLinks.defaultpageLink if different
        homePage = new hantechomePage(page); // Pass the `page` properly
    });

    test('Verify that the Hantec homepage loads successfully', async ({ page }) => {
        await test.step('Then the user should be on the Hantec homepage', async () => {
            await homePage.navigateTo(english.links.homePageLink);
        });
    });

    test('Verify all key elements on the homepage', async ({ page }) => {
        await test.step('Then the page URL should be the Hantec homepage', async () => {
            await homePage.validateOnPage(english.links.homePageLink);
        });
        await test.step('And all key web elements and the browser tab title should be displayed correctly', async () => {
            await homePage.verifyWebElements(test, english.BrowserTitle.homePageTitle, english.text.languageBtnLabel);
        });
    });

    test('Verify all links on key web elements', async ({ page }) => {
        await test.step('Then all links associated with key web elements should be valid and functional', async () => {
            // Pass only relevant parts of the fixture
            await homePage.verifyHomepageLinksUsingFixture(test, english.text, english.links);
        });
    });

    test('Verify the country selector list', async ({ page }) => {
        await test.step('Then the list of available countries in the language selector should be complete and correct', async () => {
            await homePage.verifyLanguageOptions(countrySelectors.countryLanguages, english.text.languageBtnLabel, english.text.languageOptLabel);
        });
    });

    test('Verify translations based on all country languages', async ({ page }) => {
        const countryLanguages = countrySelectors.countryLanguages;

        // Assume we start from English
        let currentLang = testData.english.text.languageBtnLabel;

        for (const languageLabel of countryLanguages) {
            const languageFixture = testData[languageLabel];

            if (!languageFixture || !languageFixture.text) {
                console.warn(`No fixture found for language: "${languageLabel}"`);
                continue;
            }

            const { languageBtnLabel, languageOptLabel, ...textLabels } = languageFixture.text;

            if (!languageOptLabel || !languageBtnLabel) {
                console.warn(`Missing labels for language: "${languageLabel}"`);
                continue;
            }

            console.log(`Changing from "${currentLang}" to "${languageOptLabel}"`);

            await test.step(`When the user selects "${languageOptLabel}" from the language selector`, async () => {
                await homePage.changeCountryLanguage(currentLang, languageOptLabel);
            });

            await test.step(`Then all key elements should display translations for "${languageLabel}"`, async () => {
                await homePage.verifyTranslatedTexts(textLabels);
            });

            // Update currentLang for next loop
            currentLang = languageBtnLabel;
        }

        console.log('All translations verified successfully.');
    });



    // Add more tests here using `homePage` and `page`
});
