const { expect } = require('@playwright/test');
const test = require('node:test');

class hantechomePage {
    constructor(page) {
        this.page = page;
        // Sample locators for todo app (adjust for your real page)
        this.header = page.locator('h1').filter({ hasText: 'Trade Better.' });
        this.retailBtn = page.getByRole('link', { name: 'Retail' })
        this.insitutionalBtn = page.getByRole('link', { name: 'Institutional' })
        this.partnersBtn = page.getByRole('link', { name: 'Partners' });
        this.balanceGuardBtn = page.getByRole('link', { name: 'hantec shield Balance Guard' });
        this.hantecSocialBtn = page.getByRole('link', { name: 'Hantec Social' });
        this.sponsorshipsBtn = page.getByRole('link', { name: 'Sponsorships' });
        this.contactusBtn = page.getByRole('link', { name: 'Contact Us' });
        this.marketsMenu = page.locator('a').filter({ hasText: /^Markets$/ })
        this.platformsMenu = page.locator('a').filter({ hasText: 'Platforms' });
        this.toolsMenu = page.locator('a').filter({ hasText: /^Tools$/ })
        this.educationMenu = page.locator('a').filter({ hasText: /^Education$/ });
        this.tradingMenu = page.locator('a').filter({ hasText: /^Trading$/ });
        this.companyMenu = page.locator('a').filter({ hasText: 'Company' });
        this.partnersMenu = page.locator('#navbar-sticky').getByRole('listitem').filter({ hasText: 'Partners' }).locator('#Partners');
        this.openAnAccountBtn = page.getByRole('navigation').getByRole('link', { name: 'Open an account' });
        this.loginBtn = page.getByRole('link', { name: 'Login' });
        this.OpenAnAccountBtn2 = page.getByRole('main').getByRole('link', { name: 'Open an account', exact: true });
        this.demoAccountBtn = page.getByRole('main').getByRole('link', { name: 'Try a demo' });
    }

    async navigateTo(pageLink) {
        // Navigate to the specified language selector link
        await this.page.goto(pageLink, { waitUntil: 'load' });
    }

    async validateOnPage(pageLink) {
        // Verify the URL after navigation
        await expect(this.page).toHaveURL(pageLink);
    }

    async verifyWebElements(testObject, pageTitle, languageBtnText) {
        const title = await this.page.title();
        await testObject.step(`Verify page title is "${pageTitle}"`, async () => {
            await expect(this.page).toHaveTitle(pageTitle);
        });
        await testObject.step('Expect Retail button to be visible', async () => {
            await expect(this.retailBtn).toBeVisible();
        });
        await testObject.step('Expect Institutional button to be visible', async () => {
            await expect(this.insitutionalBtn).toBeVisible();
        });
        await testObject.step('Expect Partners button to be visible', async () => {
            await expect(this.partnersBtn).toBeVisible();
        });
        await testObject.step('Expect Balance Guard button to be visible', async () => {
            await expect(this.balanceGuardBtn).toBeVisible();
        });
        await testObject.step('Expect Hantec Social button to be visible', async () => {
            await expect(this.hantecSocialBtn).toBeVisible();
        });
        await testObject.step('Expect Sponsorships button to be visible', async () => {
            await expect(this.sponsorshipsBtn).toBeVisible();
        });
        await testObject.step('Expect Contact Us button to be visible', async () => {
            await expect(this.contactusBtn).toBeVisible();
        });
        await testObject.step('Expect language button to be visible', async () => {
            await expect(this.languageButton(languageBtnText)).toBeVisible();
        });
        await testObject.step('Expect Open an Account button to be visible', async () => {
            await expect(this.OpenAnAccountBtn2).toBeVisible();
        });
        await testObject.step('Expect Header Text to be visible', async () => {
            await expect(this.header).toBeVisible();
        });
        await testObject.step('Expect Markets menu to be visible', async () => {
            await expect(this.marketsMenu).toBeVisible();
        });
        await testObject.step('Expect Platforms menu to be visible', async () => {
            await expect(this.platformsMenu).toBeVisible();
        });
        await testObject.step('Expect Tools menu to be visible', async () => {
            await expect(this.toolsMenu).toBeVisible();
        });
        await testObject.step('Expect Education menu to be visible', async () => {
            await expect(this.educationMenu).toBeVisible();
        });
        await testObject.step('Expect Trading menu to be visible', async () => {
            await expect(this.tradingMenu).toBeVisible();
        });
        await testObject.step('Expect Company menu to be visible', async () => {
            await expect(this.companyMenu).toBeVisible();
        });
        await testObject.step('Expect Partners menu to be visible', async () => {
            await expect(this.partnersMenu).toBeVisible();
        });
        await testObject.step('Expect Open An Account button to be visible', async () => {
            await expect(this.openAnAccountBtn).toBeVisible();
        });
        await testObject.step('Expect Login button to be visible', async () => {
            await expect(this.loginBtn).toBeVisible();
        });
        await testObject.step('Expect Open An Account button in the header to be visible', async () => {
            await expect(this.OpenAnAccountBtn2).toBeVisible();
        });
        await testObject.step('Expect Demo Account button to be visible', async () => {
            await expect(this.demoAccountBtn).toBeVisible();
        });
    }

    // Accepts text-labels and links from fixture
    async verifyHomepageLinksUsingFixture(test, textSection, linkSection) {
        // Build mapping from fixture
        const labelToLinkMap = {
            [textSection.retailLabel]: linkSection.retailLink,
            [textSection.institutionalLabel]: linkSection.institutionalLink,
            [textSection.partnersLabel]: linkSection.partnersLink,
            [textSection.balanceGuardLabel]: linkSection.balanceGuardLink,
            [textSection.hantecSocialLabel]: linkSection.hantecSocialLink,
            [textSection.sponsorshipsLabel]: linkSection.sponsorshipsLink,
            [textSection.contactusLabel]: linkSection.contactusLink,
            [textSection.openAnAccountBtnLabel]: linkSection.openAnAccountLink,
            [textSection.tryaDemoBtnLabel]: linkSection.tryaDemoLink,
            [textSection.loginBtnLabel]: linkSection.loginLink
        };

        for (const [label, expectedHref] of Object.entries(labelToLinkMap)) {
            await test.step(`Expect link for "${label}" to be "${expectedHref}"`, async () => {
                const locator = this.page.getByRole('link', { name: label }).first();
                const actualHref = await locator.getAttribute('href');
                const fullHref = new URL(actualHref, await this.page.url()).toString();

                console.log(`${label} → Expected: ${expectedHref} | Actual: ${fullHref}`);
                expect(fullHref).toBe(expectedHref);
            });
            // const locator = this.page.getByRole('link', { name: label }).first();
            // const actualHref = await locator.getAttribute('href');
            // // expect(actualHref, `Incorrect href for "${label}"`).toBe(expectedHref);
            // expect(actualHref).toBe(expectedHref);
        }

        console.log('All homepage links matched the expected hrefs.');
    }

    languageButton(languageBtnText) {
        return this.page.getByRole('button', { name: new RegExp(`^${languageBtnText}$`, 'i') });
    }

    languageOption(languageOptText) {
        if (!languageOptText || typeof languageOptText !== 'string') {
            throw new Error(`Invalid languageOptText passed: "${languageOptText}"`);
        }
        return this.page.getByRole('menuitem', { name: new RegExp(languageOptText, 'i') });
    }

    async changeCountryLanguage(languageBtnText, languageOptText) {
        await this.languageButton(languageBtnText).click();
        await this.languageOption(languageOptText).click();
    }

    // check current selected country language and verify the list of languages in the dropdown field
    async verifyLanguageOptions(countryLanguages, languageBtnText, languageOptText) {
        await this.languageButton(languageBtnText).click();
        await expect(this.languageOption(languageOptText)).toBeVisible();
        const menuItems = this.page.getByRole('menuitem');
        const count = await menuItems.count();

        const actualLanguages = [];
        for (let i = 0; i < count; i++) {
            // const text = await menuItems.nth(i).innerText();
            // actualLanguages.push(text.trim());
            const item = menuItems.nth(i);
            // Check visibility of each option
            await expect(item, `Menu item at index ${i} should be visible`).toBeVisible();

            // Still extract and store text
            const text = await item.innerText();
            actualLanguages.push(text.trim());
        }

        // Sort and compare arrays
        expect(actualLanguages.sort()).toEqual(countryLanguages.sort());

        // Optional logging of mismatches
        const missing = countryLanguages.filter(lang => !actualLanguages.includes(lang));
        const extra = actualLanguages.filter(lang => !countryLanguages.includes(lang));

        if (missing.length || extra.length) {
            console.warn('Language options mismatch:');
            if (missing.length) console.warn('Missing:', missing);
            if (extra.length) console.warn('Unexpected:', extra);
        }
        else {
            console.log('All expected language options are present.');
        }
    }

    async verifyTranslatedTexts(textFixture) {
        const missing = [];

        for (const [key, expectedText] of Object.entries(textFixture)) {
            const locator = this.page.locator(`text=${expectedText.trim()}`);
            const count = await locator.count();

            if (count === 0) {
                missing.push(`"${key}" → "${expectedText}"`);
                continue;
            }

            const visible = await locator.nth(0).isVisible();
            if (!visible) {
                console.warn(`"${key}" → "${expectedText}" exists but is hidden.`);
            }
        }

        if (missing.length > 0) {
            throw new Error(`Missing translations:\n${missing.join('\n')}`);
        }

        console.log('Translation check complete.');
    }


}

module.exports = { hantechomePage };
