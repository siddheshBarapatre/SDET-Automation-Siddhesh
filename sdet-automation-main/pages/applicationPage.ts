import { expect, Page } from "@playwright/test";

export class ApplicationPage {
    [x: string]: any;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.typeSelector = (type: any) => page.locator(`[type="${type}"]`);
        this.textOption = (text: any) => page.locator(`span:text("${text}")`);
        this.textLocator = (state: any) => page.locator(`//span/span[.="${state}"]`);
        this.inputPlaceholder = (input: string) => page.locator(`input[placeholder="${input}"]`);
        this.selectorPlaceholder = (input: string) => page.locator(`div > *[placeholder="${input}"]`);
        this.notificationText = (input: string) => page.locator(`text=${input}`);
        this.errorMessageOnEntries = page.locator('text=Please add at least 2 entries');
        this.milliseconds = 2000;
        this.highSchoolInfoInput = (name: string) => page.locator(`input[name="${name}"]`);
        this.valueSelector = (value: any) => page.locator(`[value=${value}]`);
        this.textName = (name: any) => page.locator(`//div[.='${name}']`);
        this.validationPage = (valPage: any) => page.locator(`//span[.='${valPage}']`)
        this.regionLocator = (role: string) => page.locator(`//div[@role='${role}']`);
        this.submitButton = page.locator('div[class*=mantine-Stack-root] > button[type=button]');
        this.submitBtn = page.locator('button[type="submit"]');
        this.fileUploaded = page.locator('div[class*=m_6d731127] > div[class*=mantine-Group-root]');
    }

    async beginNewApplication() {
        await expect(this.typeSelector('submit')).toBeVisible({ timeout: 50000 });
    }

    async fillOutAllRequiredFields(streetAddress: string, city: string, state: string, zipCode: string, country: string) {
        await this.inputPlaceholder('Enter your street address').fill(streetAddress);
        await this.inputPlaceholder('Enter your city').fill(city);
        await this.inputPlaceholder('Enter your state').click();
        await this.textOption(state).click();
        await this.inputPlaceholder('Enter your zip code').fill(zipCode);
        await this.inputPlaceholder('Enter your country').click();
        await this.textOption(country).click();
        await this.page.waitForTimeout(this.milliseconds);
        await this.typeSelector('submit').click();
        await expect(this.inputPlaceholder('Enter your city')).not.toBeVisible({ timeout: 200000 });
    }

    async validateAtLeast2ExtracurricularActivitiesRequired(activityName: string, years: string, leadership: string, description: string) {
        await expect(this.textLocator("Save")).toBeEnabled({ timeout: 50000 });
        await this.textOption("Add Entry").click();
        await this.inputPlaceholder("Short Input").fill(activityName);
        await this.inputPlaceholder("123").fill(years);
        await this.selectorPlaceholder("Long Input").first().fill(leadership);
        await this.selectorPlaceholder("Long Input").last().fill(description);
        await this.textLocator("Add").click();
        await this.textLocator("Save").click();
        await this.typeSelector('submit').click();
        await expect(this.errorMessageOnEntries).toHaveText('Please add at least 2 entries');
    }

    async provide4ExtracurricularActivities(activityName: string, years: string, leadership: string, description: string) {
        await this.textOption("Add Entry").click();
        await this.inputPlaceholder("Short Input").fill(activityName);
        await this.inputPlaceholder("123").fill(years);
        await this.selectorPlaceholder("Long Input").first().fill(leadership);
        await this.selectorPlaceholder("Long Input").last().fill(description);
        await this.textLocator("Add").click();
        await expect(this.textLocator("Add")).not.toBeVisible({ timeout: 50000 });
        await this.page.waitForTimeout(this.milliseconds);
    }

    async saveAndNext(name: string) {
        await this.page.waitForTimeout(1000);
        await expect(this.typeSelector('submit')).toBeVisible({ timeout: 50000 });
        await this.typeSelector('submit').click();
        await expect(this.textName(name)).not.toBeVisible({ timeout: 50000 });
    }

    async fillOutFormAndUploadSchoolTranscript(name: string, address: string, city: string, state: string, zipCode: string, gpa: string, year: string, filePath: string) {
        await this.highSchoolInfoInput('contact.highSchoolName').fill(name);
        await this.highSchoolInfoInput('contact.highSchoolAddress').fill(address);
        await this.highSchoolInfoInput('contact.highSchoolCity').fill(city);
        await this.inputPlaceholder('Enter high school state').click();
        await this.textOption(state).click();
        await this.highSchoolInfoInput('fDhCyNNnv_jcmp6xsQQws').fill(zipCode);
        await this.highSchoolInfoInput('contact.gpa').fill(gpa);
        await this.inputPlaceholder('Enter a date').fill(year);
        await this.page.setInputFiles('input[type="file"]', filePath);
        await expect(this.fileUploaded).toBeVisible({ timeout: 30000 });
    }

    async validateEachOptionShowsEssayBox() {
        const essayBoxes = ['Cars', 'Animals', 'School', 'Other'];
        for (const essayBox of essayBoxes) {
            await this.valueSelector(essayBox).click();
            await expect(this.valueSelector(essayBox)).toBeChecked({ timeout: 5000 });
            await expect(this.selectorPlaceholder("Long Input")).toBeVisible({ timeout: 5000 });
            await this.valueSelector(essayBox).click();
            await expect(this.valueSelector(essayBox)).not.toBeChecked({ timeout: 5000 });
        }
    }

    async provideEssayAnswer(essayType: string, essayText: string) {
        await this.page.waitForTimeout(1000);
        await this.valueSelector(essayType).click();
        await expect(this.valueSelector(essayType)).toBeChecked({ timeout: 5000 });
        await expect(this.selectorPlaceholder("Long Input")).toBeVisible({ timeout: 5000 });
        await this.selectorPlaceholder("Long Input").fill(essayText);
        await this.valueSelector(essayType).click();
        await expect(this.valueSelector(essayType)).not.toBeChecked({ timeout: 5000 });
    }

    async checkedEssayBox() {
        const essayBoxes = ['Animals', 'School'];
        for (const essayBox of essayBoxes) {
            await this.valueSelector(essayBox).click();
            await expect(this.valueSelector(essayBox)).toBeChecked({ timeout: 5000 });
            await expect(this.selectorPlaceholder("Long Input")).toBeVisible({ timeout: 5000 });
        }
    }

    async validateLetsGetToKnowYou(firstName: string, lastName: string, email: string, streetAddress: string, city: string, state: string, zipCode: string, country: string) {
        await expect(this.validationPage("Lets get to know you!")).toBeVisible({ timeout: 50000 });
        await this.validationPage("Lets get to know you!").click();
        const allText = await this.regionLocator('region').first().innerText();
        console.log(allText);
        expect(allText).toContain(firstName);
        expect(allText).toContain(lastName);
        expect(allText).toContain(email);
        expect(allText).toContain(streetAddress);
        expect(allText).toContain(city);
        expect(allText).toContain(state);
        expect(allText).toContain(zipCode);
        expect(allText).toContain(country);
    }

    async validateExtracurricularActivities(activityName: string) {
        await expect(this.validationPage("Extracurricular Activities")).toBeVisible({ timeout: 50000 });
        await this.validationPage("Extracurricular Activities").click();
        const allText = await this.regionLocator('region').nth(1).innerText();
        console.log(allText);
        expect(allText).toContain(activityName);
    }

    async validateHighSchoolInformation(name: string, address: string, city: string, state: string, zipCode: string, gpa: string, year: string) {
        await expect(this.validationPage("High School Information")).toBeVisible({ timeout: 50000 });
        await this.validationPage("High School Information").click();
        const allText = await this.regionLocator('region').nth(6).innerText();
        console.log(allText);
        expect(allText).toContain(name);
        expect(allText).toContain(address);
        expect(allText).toContain(city);
        expect(allText).toContain(state);
        expect(allText).toContain(zipCode);
        expect(allText).toContain(gpa);
        expect(allText).toContain(year);
    }

    async validateEssay(animal: string, essayAboutAnimals: string, school: string, essayAboutSchool: string) {
        await expect(this.validationPage("Essay")).toBeVisible({ timeout: 50000 });
        await this.validationPage("Essay").click();
        const allText = await this.regionLocator('region').last().innerText();
        console.log(allText);
        expect(allText).toContain(animal);
        expect(allText).toContain(essayAboutAnimals);
        expect(allText).toContain(school);
        expect(allText).toContain(essayAboutSchool);
    }

    async submitApplication() {
        await this.submitButton.first().click();
        await expect(this.submitButton.first()).not.toBeVisible({ timeout: 1500000 });
    }

    async editButtonNotVisible() {
        await expect(this.textOption("Complete")).toBeVisible({ timeout: 50000 });
        const currentUrl = this.page.url();
        console.log("Current URL: ", currentUrl);
        await expect(this.validationPage("Lets get to know you!")).not.toBeVisible();
        await expect(this.validationPage("Extracurricular Activities")).not.toBeVisible();
        await expect(this.validationPage("High School Information")).not.toBeVisible();
        await expect(this.validationPage("Essay")).not.toBeVisible();
        await expect(this.submitBtn).not.toBeVisible();
    }
}