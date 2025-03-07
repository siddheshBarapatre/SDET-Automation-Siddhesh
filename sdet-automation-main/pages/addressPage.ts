import { Page } from "@playwright/test";

export class addressPage {

    [x: string]: any;
    page: Page;

    constructor(page: Page) {

        this.page = page
        this.streetAddress = page.locator('input[placeholder="Enter your street address"]');
        this.enterState = page.locator('input[placeholder="Enter your state"]');
        this.stateOption = (state: any) => page.locator(`span:text("${state}")`);
        this.enterCity = page.locator('input[placeholder="Enter your city"]');
        this.zipCode = page.locator('input[placeholder="Enter your zip code"]');
        this.country = page.locator('input[placeholder="Enter your country"]');
        this.countryOption = (country: any) => page.locator(`span:text("${country}")`);
        this.nextPageButton = page.locator('.mantine-Button-label:has-text("Next Page")');
        this.milliseconds = 10000;
    }

    async fillAddressDetails(streetAddress: string, state: string, city: string, zipCode: string, country: string) {
        await this.streetAddress.fill(streetAddress);
        await this.enterState.click();
        await this.stateOption(state).click();
        await this.enterCity.fill(city);
        await this.zipCode.fill(zipCode);
        await this.country.click();
        await this.countryOption(country).click();
        await this.nextPageButton.click();
        await this.page.waitForTimeout(this.milliseconds);
    }
}