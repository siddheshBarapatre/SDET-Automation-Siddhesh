import { Page } from "@playwright/test";

export class registerPage {

    [x: string]: any;
    page: Page;

    constructor(page: Page) {

        this.page = page
        this.loginToApplyButton = page.locator('#sign-in');
        this.enterEmailAddress = page.locator('[aria-label="Email Address"]');
        this.nextButton = page.locator('#login-page__cta');
        this.firstName = page.locator('[aria-label="First Name"]')
        this.lastName = page.locator('[aria-label="Last Name"]')
        this.phoneInput = page.locator('input[placeholder="1 (702) 123-4567"]');
        this.password = page.locator('[aria-label="Create a Password"]')
        this.ageConsent = page.locator('[aria-label="I confirm that I am at least 13 years old"]');
        this.submitButton = page.locator('[aria-label="Submit"]');
    }

    async navigateToLandingPage(url: string) {
        await this.page.goto(url, { waitUntil: 'load' });
        await this.loginToApplyButton.click();
    }

    async inputEmailAddress(inputEmail: any) {
        await this.enterEmailAddress.fill(inputEmail);
        await this.nextButton.click();
    }

    async fillSignupForm(firstName: any, lastName: any, phoneInput: any, password: any) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.phoneInput.fill(phoneInput);
        await this.password.fill(password);
        await this.ageConsent.click();
    }

    async clickSubmitOnSignup() {
        await this.submitButton.click();
    }
}