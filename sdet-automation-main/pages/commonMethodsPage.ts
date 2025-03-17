import { expect, Page } from "@playwright/test";

export class CommonMethodsPage {
    [x: string]: any;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.loginToApplyButton = page.locator('#sign-in');
        this.nextButton = page.locator('#login-page__cta');
        this.querySelector = (label: string) => page.locator(`[aria-label="${label}"]`);
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
    }

    async navigateToTheApplicationPage(applicationPageUrl: string) {
        await this.page.goto(applicationPageUrl, { waitUntil: 'load' });
        await this.loginToApplyButton.click();
    }

    async registerNewUser(firstName: string, lastName: string, email: string, phone: string, password: string) {
        await this.querySelector('Email Address').fill(email);
        await this.nextButton.click();
        await this.querySelector('First Name').fill(firstName);
        await this.querySelector('Last Name').fill(lastName);
        await this.typeSelector('tel').fill(phone);
        await this.querySelector('Create a Password').fill(password);
        await this.querySelector('I confirm that I am at least 13 years old').click();
        await this.page.evaluate(() => {
            const submitButton = document.querySelector('Submit') as HTMLButtonElement;
            if (submitButton) {
                submitButton.disabled = false;
            }
        });
        await this.querySelector('Submit').click();
        await expect(this.querySelector('Submit')).not.toBeVisible({ timeout: 50000 });
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
        await this.textLocator("Save").click();
        await expect(this.notificationText('Application saved').first()).toBeVisible({ timeout: 50000 });
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
        await this.page.waitForTimeout(this.milliseconds);
        await this.typeSelector('submit').click();
        await expect(this.highSchoolInfoInput('contact.highSchoolName')).not.toBeVisible({ timeout: 100000 });
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
        await this.valueSelector(essayType).click();
        await expect(this.valueSelector(essayType)).toBeChecked({ timeout: 5000 });
        await expect(this.selectorPlaceholder("Long Input")).toBeVisible({ timeout: 5000 });
        await this.selectorPlaceholder("Long Input").fill(essayText);
        await this.valueSelector(essayType).click();
        await expect(this.valueSelector(essayType)).not.toBeChecked({ timeout: 5000 });
    }
}