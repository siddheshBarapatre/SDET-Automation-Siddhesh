import { expect, Page } from "@playwright/test";

export class submitApplicationPage {

    [x: string]: any;
    page: Page;

    constructor(page: Page) {

        this.page = page
        this.completeApplicationLink = page.locator('[aria-label="View Application"]');
        this.editExtracurricularButton = page.locator('//span[contains(@class, "mantine-Text-root") and text()="Extracurricular Activities"]/ancestor::div[contains(@class, "mantine-Group-root")]//a[contains(@class, "mantine-Button-root") and contains(.,"Edit")]');
        this.editHighSchoolInfo = page.locator('//span[contains(@class, "mantine-Text-root") and text()="High School Information"]/ancestor::div[contains(@class, "mantine-Group-root")]//a[contains(@class, "mantine-Button-root") and contains(.,"Edit")]');
        this.submitBtn = page.locator('button[type="submit"]');
        this.editEssayButton = page.locator('//span[contains(@class, "mantine-Text-root") and text()="Essay"]/ancestor::div[contains(@class, "mantine-Group-root")]//a[contains(@class, "mantine-Button-root") and contains(.,"Edit")]');
        this.submitFinalBtn = page.locator('//*[text()="Submit"]');
    }

    async completeTheApplication() {
        await this.completeApplicationLink.first().click();
    }

    async submitTheApplicationButton() {
        const currentUrl = this.page.url();
        console.log("Current URL: ", currentUrl);
        await this.submitFinalBtn.click();
    }

    async editButtonNotVisible() {
        await expect(this.editExtracurricularButton).not.toBeVisible();
        await expect(this.editHighSchoolInfo).not.toBeVisible();
        await expect(this.editEssayButton).not.toBeVisible();
        await expect(this.submitBtn).not.toBeVisible();
    }
}