import { Page } from "@playwright/test";

export class HighSchoolInfoPage {

    [x: string]: any;
    page: Page;

    constructor(page: Page) {

        this.page = page
        this.stateOption = (state: any) => page.locator(`span:text("${state}")`);
        this.nextPageButton = page.locator('.mantine-Button-label:has-text("Next Page")');
        this.milliseconds = 5000;
        this.editHighSchoolInf = page.locator('//span[contains(@class, "mantine-Text-root") and text()="High School Information"]/ancestor::div[contains(@class, "mantine-Group-root")]//a[contains(@class, "mantine-Button-root") and contains(.,"Edit")]');
        this.highSchoolInfoInput = (name: string) => page.locator(`input[name="${name}"]`);
        this.dynamicInputPlaceholder = (placeholder: string) => page.locator(`input[placeholder="${placeholder}"]`);
    }

    async submitHighSchoolInfoForm() {
        await this.nextPageButton.click();
        await this.highSchoolInfoInput('contact.highSchoolName').waitFor({ state: 'hidden' });
    }

    async editHighSchoolInfo() {
        await this.editHighSchoolInf.click();
    }

    async fillHighSchoolInfo(name: string, address: string, city: string, state: string, zipcode: any, gpa: any, year: any) {
        await this.highSchoolInfoInput('contact.highSchoolName').fill(name);
        await this.highSchoolInfoInput('contact.highSchoolAddress').fill(address);
        await this.highSchoolInfoInput('contact.highSchoolCity').fill(city);
        await this.dynamicInputPlaceholder('Enter high school state').click();
        await this.stateOption(state).click();
        await this.highSchoolInfoInput('fDhCyNNnv_jcmp6xsQQws').fill(name);
        await this.highSchoolInfoInput('contact.gpa').fill(address);
        await this.dynamicInputPlaceholder('Enter a date').fill(year);
    }

    async uploadTranscript(filePath: string) {
        await this.page.setInputFiles('input[type="file"]', filePath);
        await this.page.waitForTimeout(this.milliseconds);
    }
}