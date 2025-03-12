import { Page } from "@playwright/test";

export class CommonMethodsPage {
    [x: string]: any;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.loginApplyButton = page.getByText('Log In to Apply', { exact: true });
        this.enterEmailAddress = page.locator('[aria-label="Email Address"]');
        this.nextButton = page.locator('#login-page__cta');
        this.enterYourPassword = page.locator('[aria-label="Enter Your Password"]');
        this.returnHome = page.getByText('View Program Details', { exact: true });
        this.viewApplicationButton = page.getByText('View Applications', { exact: true });
        this.continueButton = page.getByText('Continue', { exact: true });
    }

    async navigateToAddressPage(applicationPageUrl: string, testEmail: string, password: string) {
        await this.page.goto(applicationPageUrl, { waitUntil: 'load' });
        await this.loginApplyButton.click();
        await this.enterEmailAddress.fill(testEmail);
        await this.nextButton.click();
        await this.enterYourPassword.fill(password);
        await this.nextButton.click();
    }

    async clickReturnHome() {
        await this.returnHome.click();
    }

    async clickViewApplication() {
        await this.viewApplicationButton.first().click();
        await this.continueButton.click();
    }
}