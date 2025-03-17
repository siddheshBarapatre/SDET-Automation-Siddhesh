import { Page } from "@playwright/test";

export class RegisterPage {
    [x: string]: any;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.loginToApplyButton = page.locator('#sign-in');
        this.nextButton = page.locator('#login-page__cta');
        this.phoneInput = page.locator('input[placeholder="1 (702) 123-4567"]');
        this.dynamicLocator = (label: string) => page.locator(`[aria-label="${label}"]`);
    }

    async navigateToLandingPage(url: string) {
        await this.page.goto(url, { waitUntil: 'load' });
        await this.loginToApplyButton.click();
    }

    async inputEmailAddress(inputEmail: string) {
        await this.enterEmailAddress.fill(inputEmail);
        await this.nextButton.click();
    }

    async fillRegistrationForm(firstName: string, lastName: string, email: string, phoneInput: string, password: string) {
        await this.dynamicLocator('Email Address').fill(email);
        await this.nextButton.click();
        await this.dynamicLocator('First Name').fill(firstName);
        await this.dynamicLocator('Last Name').fill(lastName);
        await this.phoneInput.fill(phoneInput);

        await this.dynamicLocator('Create a Password').fill(password);
        await this.dynamicLocator('I confirm that I am at least 13 years old').click();
    }

    async submitRegistrationForm() {
        await this.page.waitForTimeout(2000);
        await this.dynamicLocator('Submit').click();
        await this.dynamicLocator('Submit').waitFor({ state: 'hidden', timeout: 50000 });
    }
}