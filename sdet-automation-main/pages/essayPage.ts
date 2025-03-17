import { expect, Page } from "@playwright/test";

export class EssayPage {

    [x: string]: any;
    page: Page;

    constructor(page: Page) {
        this.page = page
        this.editHighSchoolInfoPara = page.locator('//span[contains(@class, "mantine-Text-root") and text()="High School Information"]/ancestor::div[contains(@class, "mantine-Group-root")]//a[contains(@class, "mantine-Button-root") and contains(.,"Edit")]/following-sibling::p');
        this.editEssayButton = page.locator('//span[contains(@class, "mantine-Text-root") and text()="Essay"]/ancestor::div[contains(@class, "mantine-Group-root")]//a[contains(@class, "mantine-Button-root") and contains(.,"Edit")]');
        this.editEssayButtonPara = page.locator('//span[contains(@class, "mantine-Text-root") and text()="Essay"]/ancestor::div[contains(@class, "mantine-Group-root")]//a[contains(@class, "mantine-Button-root") and contains(., "Edit")]/following-sibling::p');
        this.inputBox = page.locator('[placeholder="Long Input"]');
        this.saveButton = page.getByText('Save', { exact: true });
        this.nextPageButton = page.locator('.mantine-Button-label:has-text("Next Page")');
    }

    async submitEssayForm() {
        await this.nextPageButton.click();
        await this.nextPageButton.waitFor({ state: 'hidden' });
        const highSchoolCountText = await this.editHighSchoolInfoPara.textContent();
        const essayButtonCountText = await this.editEssayButtonPara.textContent();
        const highSchoolCount = parseInt(highSchoolCountText, 10);
        const essayButtonCount = parseInt(essayButtonCountText, 10);
        expect(highSchoolCount).toBeGreaterThan(1);
        expect(essayButtonCount).toBeGreaterThan(1);
    }

    async editEssay() {
        await this.editEssayButton.click();
    }

    async verifyEssayCheckboxes() {
        const essayTitles = ['Cars', 'Animals', 'School', 'Other'];
        const checkedCheckboxes = this.page.locator('input[type="checkbox"]:checked');
        const count = await checkedCheckboxes.count();
        for (let i = 0; i < count; i++) {
            await checkedCheckboxes.nth(i).uncheck();
            await this.page.waitForTimeout(1000);
        }
        for (let i = 0; i < essayTitles.length; i++) {
            const checkbox = this.page.locator(`input[type="checkbox"][value="${essayTitles[i]}"]`);
            await checkbox.click();
            await this.page.waitForTimeout(1000);
            await expect(checkbox).toBeChecked();
            await expect(this.inputBox).toBeVisible();
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        }
    }

    async fillInfoForAnimalCheckbox(animal: string, animalEssay: string) {
        let checkboxForAnimal = this.page.locator(`input[type="checkbox"][value="${animal}"]`);
        await checkboxForAnimal.check();
        await expect(this.inputBox).toBeVisible();
        await this.page.waitForTimeout(2000);
        await this.inputBox.fill(animalEssay);
        await this.page.waitForTimeout(2000);
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
        await checkboxForAnimal.uncheck();
        await this.page.waitForTimeout(1000);
        await this.saveButton.click();
    }

    async fillInfoForSchoolCheckbox(school: string, animal: string, schoolEssay: string) {
        let checkboxForSchool = this.page.locator(`input[type="checkbox"][value="${school}"]`);
        let checkboxForAnimal = this.page.locator(`input[type="checkbox"][value="${animal}"]`);
        await this.page.waitForTimeout(1000);
        await checkboxForSchool.check();
        await expect(this.inputBox).toBeVisible();
        await this.page.waitForTimeout(2000);
        await this.inputBox.fill(schoolEssay);
        await this.page.waitForTimeout(2000);
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
        await checkboxForAnimal.check();
        await this.page.waitForTimeout(1000);
        await this.saveButton.click();
    }
}