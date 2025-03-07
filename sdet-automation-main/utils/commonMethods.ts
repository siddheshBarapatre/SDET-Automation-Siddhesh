import { Page } from "@playwright/test";

export default class commonMethods {

    static async navigateToNewApplicationPage(page: Page, applicationPageUrl: string, testEmail: string, password: string) {
        const loginApplyButton = page.getByText('Log In to Apply', { exact: true });
        const enterEmailAddress = page.locator('[aria-label="Email Address"]');
        const nextButton = page.locator('#login-page__cta');
        const enterYourPassword = page.locator('[aria-label="Enter Your Password"]');

        await page.goto(applicationPageUrl, { waitUntil: 'load' });
        await loginApplyButton.click();
        await enterEmailAddress.fill(testEmail);
        await nextButton.click();
        await enterYourPassword.fill(password);
        await nextButton.click();
    }

    static async clickReturnHome(page: Page) {
        const returnHome = page.getByText('View Program Details', { exact: true });

        await returnHome.click();
    }

    static async clickViewApplication(page: Page) {
        const viewApplicationButton = page.getByText('View Applications', { exact: true });
        const continueButton = page.getByText('Continue', { exact: true });

        await viewApplicationButton.first().click();
        await continueButton.click();
    }
}