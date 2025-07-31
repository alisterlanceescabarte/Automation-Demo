const { expect } = require('@playwright/test');

class hantecdemoPage {
    constructor(page) {
        this.page = page;
        // Sample locators for demo page (adjust for your real page)
        this.header = page.locator('h1').filter({ hasText: 'Trade Better.' });
        this.demoForm = page.locator('#demo-form');
        this.nameInput = this.demoForm.getByRole('textbox', { name: 'Name' });
        this.emailInput = this.demoForm.getByRole('textbox', { name: 'Email' });
        this.phoneInput = this.demoForm.getByRole('textbox', { name: 'Phone' });
        this.submitBtn = this.demoForm.getByRole('button', { name: 'Submit' });
    }

    async navigateTo(pageLink) {
        // Navigate to the specified demo page link
        await this.page.goto(pageLink, { waitUntil: 'domcontentloaded' });
    }

    async validateOnPage(pageLink) {
        // Verify the URL after navigation
        await expect(this.page).toHaveURL(pageLink);
    }

    async verifyWebElements(pageTitle) {
        const title = await this.page.title();
        await expect(title).toBe(pageTitle);
        await expect(this.header).toBeVisible();
        await expect(this.demoForm).toBeVisible();
        await expect(this.nameInput).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.phoneInput).toBeVisible();
        await expect(this.submitBtn).toBeVisible();
    }
}