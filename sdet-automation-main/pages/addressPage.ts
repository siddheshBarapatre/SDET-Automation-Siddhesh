import { Page } from "@playwright/test";

export class AddressPage {
    [x: string]: any;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.stateOption = (state: any) => page.locator(`span:text("${state}")`);
        this.countryOption = (country: any) => page.locator(`span:text("${country}")`);
        this.nextPageButton = page.locator('.mantine-Button-label:has-text("Next Page")');
        this.inputLocator = (input: string) => page.locator(`input[placeholder="${input}"]`);
    }

    async fillAddressForm(streetAddress: string, city: string, state: string, zipCode: string, country: string) {
        await this.inputLocator('Enter your street address').fill(streetAddress);
        await this.inputLocator('Enter your city').fill(city);
        await this.inputLocator('Enter your state').click();
        await this.stateOption(state).click();
        await this.inputLocator('Enter your zip code').fill(zipCode);
        await this.inputLocator('Enter your country').click();
        await this.countryOption(country).click();
    }

    async submitAddressForm() {
        await this.page.waitForTimeout(1000);
        await this.nextPageButton.click();
        await this.inputLocator('Enter your city').waitFor({ state: 'hidden', timeout: 50000 });
    }
}