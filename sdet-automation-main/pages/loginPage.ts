import { expect, Page } from "@playwright/test";

export class LoginPage {
    [x: string]: any;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.loginToApplyButton = page.locator('#sign-in');
        this.nextButton = page.locator('#login-page__cta');
        this.querySelector = (label: string) => page.locator(`[aria-label="${label}"]`);
        this.typeSelector = (type: any) => page.locator(`[type="${type}"]`);
        this.submitButton = page.locator('div[class*=mantine-Stack-root] > button[type=button]');
    }

    async navigateToTheApplicationPage(applicationPageUrl: string) {
        await this.page.goto(applicationPageUrl, { waitUntil: 'load' });
        await this.loginToApplyButton.click();
    }

    async registerNewUser(firstName: string, lastName: string, email: string, phone: string, password: string) {
        await this.querySelector('Email Address').fill(email);
        await this.nextButton.click();
        await this.querySelector('First Name').fill(firstName);
        await this.querySelector('Last Name').fill(lastName);
        await this.typeSelector('tel').fill(phone);
        await this.querySelector('Create a Password').fill(password);
        await this.querySelector('I confirm that I am at least 13 years old').click();
        await this.page.evaluate(() => {
            const submitButton = document.querySelector('Submit') as HTMLButtonElement;
            if (submitButton) {
                submitButton.disabled = false;
            }
        });
        await this.querySelector('Submit').click();
        await expect(this.querySelector('Submit')).not.toBeVisible({ timeout: 50000 });
    }
}