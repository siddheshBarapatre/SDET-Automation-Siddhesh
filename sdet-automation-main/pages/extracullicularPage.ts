import { expect, Page } from "@playwright/test";

export class extracullicularPage {

    [x: string]: any;
    page: Page;

    constructor(page: Page) {

        this.page = page
        this.nextPageButton = page.locator('.mantine-Button-label:has-text("Next Page")');
        this.editExtracurricularButton = page.locator('//span[contains(@class, "mantine-Text-root") and text()="Extracurricular Activities"]/ancestor::div[contains(@class, "mantine-Group-root")]//a[contains(@class, "mantine-Button-root") and contains(.,"Edit")]');
        this.addEntryButton = page.locator('span.mantine-Button-label:has-text("Add Entry")');
        this.activityName = page.locator('input[placeholder="Short Input"]');
        this.totalYearsInvolved = page.locator('input[placeholder="123"]');
        this.leadershipInput = (index: any) => page.locator(`textarea[name="subFormAnswers.zmy0qL5e-jkdOLt-lU7ts.${index}.answers.WHHCYtxcjT3ihV2tBZrel"]`);
        this.descriptionInput = (indexT: any) => page.locator(`textarea[name="subFormAnswers.zmy0qL5e-jkdOLt-lU7ts.${indexT}.answers.lLq993Pua3MlulxHtDCct"]`);
        this.addButton = page.getByText('Add', { exact: true });
        this.errorMessageOnEntries = page.locator('text=Please add at least 2 entries');
        this.milliseconds = 4000;
        this.saveButton = page.getByText('Save', { exact: true });
    }

    async editExtracurricularActivities() {
        await this.editExtracurricularButton.click();
    }

    async addEntriesForExtraCurricular() {
        await this.addEntryButton.click();
    }

    async fillExtracurricularDetails(activity: string, years: string, leadership: string, description: string, index: any, indexT: any) {
        await this.activityName.fill(activity);
        await this.totalYearsInvolved.fill(years);
        await this.leadershipInput(index).fill(leadership);
        await this.descriptionInput(indexT).fill(description);
        await this.addButton.click();
        await this.saveButton.click();
    }

    async clickNextPageButton() {
        await this.nextPageButton.click();
        await this.page.waitForTimeout(this.milliseconds);
    }

    async verifyErrorMessage() {
        // Verify if the error message locator contains the expected message
        await expect(this.errorMessageOnEntries).toHaveText('Please add at least 2 entries');
    }

    async verifyErrorMessageHidden() {
        await this.saveButton.click();
        await expect(this.errorMessageOnEntries).toBeHidden();
    }
}