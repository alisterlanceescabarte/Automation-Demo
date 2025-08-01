const { expect } = require('@playwright/test');

class hantecdemoPage {
    constructor(page) {
        this.page = page;
        // Sample locators for todo app (adjust for your real page)
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
        this.mt4Option = page.getByRole('button', { name: 'MT4' });
        this.mt5Option = page.getByRole('button', { name: 'MT5' });
        this.createDemoAcc = page.getByRole('button', { name: 'Open a demo account' });
        this.leverageValidText = page.getByText('Leverage is required');
        this.accSizeValidText = page.getByText('Account size is required');
        this.firstNameValidText = page.getByText('First name is required');
        this.lastNameValidText = page.getByText('Last name is required');
        this.emailValidText = page.getByText('Email is required');
        this.emailInValidText = page.getByText('Invalid email');
        this.countryCodeValue = page.getByRole('button', { name: '🇵🇭 +63 Philippines' });
        this.countryValidText = page.getByText('Country is required');
        this.phoneNumberValidText = page.getByText('Invalid phone number');
        this.newsCheckbox = page.getByRole('checkbox');
        this.successSubmissionText = page.getByText('Your submission was');
        this.leverageField = page.locator('select[name="leverage"]');
        this.leveragePlaceholder = page.locator('select[name="leverage"] Option');
        this.accSizeField = page.locator('select[name="deposit"]');
        this.accSizePlaceholder = page.locator('select[name="deposit"] Option');
        this.emailField = page.getByRole('textbox', { name: 'E.g. john.doe@email.com' });
        this.firstNameField = page.getByRole('textbox', { name: 'E.g. John', exact: true });
        this.lastNameField = page.getByRole('textbox', { name: 'E.g. Doe' });
        this.phoneNumberField = page.getByRole('textbox', { name: 'Example: 0905 123' });
        this.countryCodeField = page.getByRole('textbox', { name: 'Country code' });
        this.countryField = page.locator('select[name="country"]');
        this.countryPlaceholder = page.locator('select[name="country"] Option');
    }

    async navigateTo(pageLink) {
        // Navigate to the specified demo page link
        await this.page.goto(pageLink, { waitUntil: 'domcontentloaded' });
    }

    async validateOnPage(pageLink) {
        // Verify the URL after navigation
        await expect(this.page).toHaveURL(pageLink);
    }

    languageButton(languageBtnText) {
        return this.page.getByRole('button', { name: new RegExp(`^${languageBtnText}$`, 'i') });
    }

    async verifyWebElements(testObj, pageTitle, languageBtnText) {
        const title = await this.page.title();
        await testObj.step(`Verify page title is "${pageTitle}"`, async () => {
            await expect(this.page).toHaveTitle(pageTitle);
        });
        await testObj.step('Expect Retail button to be visible', async () => {
            await expect(this.retailBtn).toBeVisible();
        });
        await testObj.step('Expect Institutional button to be visible', async () => {
            await expect(this.insitutionalBtn).toBeVisible();
        });
        await testObj.step('Expect Partners button to be visible', async () => {
            await expect(this.partnersBtn).toBeVisible();
        });
        await testObj.step('Expect Balance Guard button to be visible', async () => {
            await expect(this.balanceGuardBtn).toBeVisible();
        });
        await testObj.step('Expect Hantec Social button to be visible', async () => {
            await expect(this.hantecSocialBtn).toBeVisible();
        });
        await testObj.step('Expect Sponsorships button to be visible', async () => {
            await expect(this.sponsorshipsBtn).toBeVisible();
        });
        await testObj.step('Expect Contact Us button to be visible', async () => {
            await expect(this.contactusBtn).toBeVisible();
        });
        await testObj.step(`Expect language button "${languageBtnText}" to be visible`, async () => {
            await expect(this.languageButton(languageBtnText)).toBeVisible();
        });
        await testObj.step('Expect Markets menu to be visible', async () => {
            await expect(this.marketsMenu).toBeVisible();
        });
        await testObj.step('Expect Platforms menu to be visible', async () => {
            await expect(this.platformsMenu).toBeVisible();
        });
        await testObj.step('Expect Tools menu to be visible', async () => {
            await expect(this.toolsMenu).toBeVisible();
        });
        await testObj.step('Expect Education menu to be visible', async () => {
            await expect(this.educationMenu).toBeVisible();
        });
        await testObj.step('Expect Trading menu to be visible', async () => {
            await expect(this.tradingMenu).toBeVisible();
        });
        await testObj.step('Expect Company menu to be visible', async () => {
            await expect(this.companyMenu).toBeVisible();
        });
        await testObj.step('Expect Partners menu to be visible', async () => {
            await expect(this.partnersMenu).toBeVisible();
        });
        await testObj.step('Expect Open An Account button to be visible', async () => {
            await expect(this.openAnAccountBtn).toBeVisible();
        });
        await testObj.step('Expect Login button to be visible', async () => {
            await expect(this.loginBtn).toBeVisible();
        });
    }

    // Accepts text-labels and links from fixture
    async verifyDemopageLinksUsingFixture(test, textSection, linkSection) {
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
        };

        for (const [label, expectedHref] of Object.entries(labelToLinkMap)) {
            await test.step(`Expect link for "${label}" to be "${expectedHref}"`, async () => {
                const locator = this.page.getByRole('link', { name: label }).first();
                const actualHref = await locator.getAttribute('href');
                const fullHref = new URL(actualHref, await this.page.url()).toString();

                console.log(`${label} → Expected: ${expectedHref} | Actual: ${fullHref}`);
                expect(fullHref).toBe(expectedHref);
            });
        }

        console.log('All homepage links matched the expected hrefs.');
    }


    async verifyrequiredFields(placeholders) {

        await expect(this.leveragePlaceholder.first()).toHaveText(placeholders.leveragePlaceholder);
        await expect(this.accSizePlaceholder.first()).toHaveText(placeholders.demoAccSizePlaceholder);
        await expect(this.emailField).toHaveAttribute('placeholder', placeholders.emailPlaceholder);
        await expect(this.firstNameField).toHaveAttribute('placeholder', placeholders.firstNamePlaceholder);
        await expect(this.lastNameField).toHaveAttribute('placeholder', placeholders.lastNamePlaceholder);
        await expect(this.emailField).toHaveAttribute('placeholder', placeholders.emailPlaceholder);
        await expect(this.countryPlaceholder.first()).toHaveText(placeholders.countryPlaceholder);
        await expect(this.createDemoAcc).toBeVisible();
        await expect(this.createDemoAcc).toHaveText(placeholders.submit);
    }

    async requiredFieldsValidation(expectedErrors) {
        await this.createDemoAcc.click();
        await expect(this.leverageValidText).toBeVisible();
        await expect(this.leverageValidText).toHaveText(expectedErrors.leverageField);
        await expect(this.accSizeValidText).toBeVisible();
        await expect(this.accSizeValidText).toHaveText(expectedErrors.demoAccSizeField);
        await expect(this.firstNameValidText).toBeVisible();
        await expect(this.firstNameValidText).toHaveText(expectedErrors.firstNameField);
        await expect(this.lastNameValidText).toBeVisible();
        await expect(this.lastNameValidText).toHaveText(expectedErrors.lastNameField);
        await expect(this.emailValidText).toBeVisible();
        await expect(this.emailValidText).toHaveText(expectedErrors.emailField);
        await expect(this.countryValidText).toBeVisible();
        await expect(this.countryValidText).toHaveText(expectedErrors.countryField);
        await expect(this.phoneNumberValidText).toBeVisible();
        await expect(this.phoneNumberValidText).toHaveText(expectedErrors.phoneNumberField);
        await this.emailField.click();
        await this.emailField.fill(expectedErrors.invalidEmailAddress);
        await this.emailField.click();
        await this.countryCodeField.click();
        await this.countryCodeValue.click();
        await this.phoneNumberField.click();
        await expect(this.emailInValidText).toHaveText(expectedErrors.invalidEmail);
        await this.phoneNumberField.click();
        await this.phoneNumberField.fill(expectedErrors.invalidPhoneNumber);
        await this.emailField.click();
        await expect(this.phoneNumberValidText).toHaveText(expectedErrors.phoneNumberField);
    }

    async submitValidAcc(expectedData) {
        await this.leverageField.click();
        await this.leverageField.selectOption(expectedData.leverageValue);
        await this.accSizeField.click();
        await this.accSizeField.selectOption(expectedData.demoAccSizeValue);
        await this.firstNameField.click();
        await this.firstNameField.fill(expectedData.firstName);
        await this.lastNameField.click();
        await this.lastNameField.fill(expectedData.lastName);
        await this.emailField.click();
        await this.emailField.fill(expectedData.email);
        await this.countryField.click();
        await this.countryField.selectOption(expectedData.country);
        await this.countryCodeField.click();
        await this.countryCodeValue.click();
        await this.countryField.click();
        await this.phoneNumberField.click();
        await this.phoneNumberField.fill(expectedData.phoneNumber);
        await this.newsCheckbox.check();
        await this.createDemoAcc.click();
        await expect(this.successSubmissionText).toBeVisible();
        await expect(this.successSubmissionText).toHaveText(expectedData.successmessage);
    }
}

module.exports = { hantecdemoPage };
