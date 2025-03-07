import { Page } from "@playwright/test";

export class highSchoolInfoPage {

    [x: string]: any;
    page: Page;

    constructor(page: Page) {

        this.page = page
        this.stateOption = (state: any) => page.locator(`span:text("${state}")`);
        this.nextPageButton = page.locator('.mantine-Button-label:has-text("Next Page")');
        this.milliseconds = 5000;
        this.editHighSchoolInfo = page.locator('//span[contains(@class, "mantine-Text-root") and text()="High School Information"]/ancestor::div[contains(@class, "mantine-Group-root")]//a[contains(@class, "mantine-Button-root") and contains(.,"Edit")]');
        this.highSchoolName = page.locator('input[name="contact.highSchoolName"]');
        this.highSchoolStreetAddress = page.locator('input[name="contact.highSchoolAddress"]');
        this.highSchoolCity = page.locator('input[name="contact.highSchoolCity"]');
        this.highSchoolState = page.locator('input[placeholder="Enter high school state"]');
        this.highSchoolZipCode = page.locator('input[name="fDhCyNNnv_jcmp6xsQQws"]');
        this.gpa = page.locator('input[name="contact.gpa"]');
        this.yearOfHighSchool = page.locator('input[placeholder="Enter a date"]');
    }

    async clickNextPageButton() {
        await this.nextPageButton.click();
        await this.highSchoolName.waitFor({ state: 'hidden' });
    }

    async editHighSchoolInformation() {
        await this.editHighSchoolInfo.click();
    }

    async fillHighSchoolInfo(name: string, address: string, city: string, state: string, zipcode: any, gpa: any, year: any) {
        await this.highSchoolName.fill(name);
        await this.highSchoolStreetAddress.fill(address);
        await this.highSchoolCity.fill(city);
        await this.highSchoolState.click();
        await this.stateOption(state).click();
        await this.highSchoolZipCode.fill(zipcode);
        await this.gpa.fill(gpa);
        await this.yearOfHighSchool.fill(year);
    }

    async clickUpload(filePath: string) {
        await this.page.setInputFiles('input[type="file"]', filePath);
        await this.page.waitForTimeout(this.milliseconds);
    }
}