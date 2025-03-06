import { context } from "@cucumber/cucumber";
import { expect, Page } from "@playwright/test";

export class Locators {


    [x: string]: any;
    page: Page;

    constructor(page: Page) {

        this.page = page
        this.context = context;
        this.loginToApplyButton = page.locator('#sign-in');
        this.enterEmailAddress = page.locator('[aria-label="Email Address"]');
        this.nextButton = page.locator('#login-page__cta');
        this.firstName = page.locator('[aria-label="First Name"]')
        this.lastName = page.locator('[aria-label="Last Name"]')
        this.phoneInput = page.locator('input[placeholder="1 (702) 123-4567"]');
        this.password = page.locator('[aria-label="Create a Password"]')
        this.ageConsent = page.locator('[aria-label="I confirm that I am at least 13 years old"]');
        this.submitButton = page.locator('[aria-label="Submit"]');
        this.streetAddress = page.locator('input[placeholder="Enter your street address"]');
        this.enterState = page.locator('input[placeholder="Enter your state"]');
        this.stateOption = (state: any) => page.locator(`span:text("${state}")`);
        this.enterCity = page.locator('input[placeholder="Enter your city"]');
        this.zipCode = page.locator('input[placeholder="Enter your zip code"]');
        this.country = page.locator('input[placeholder="Enter your country"]');
        this.countryOption = (country: any) => page.locator(`span:text("${country}")`);
        this.nextPageButton = page.locator('.mantine-Button-label:has-text("Next Page")');
        this.beginButton = page.locator('.mantine-Button-label:has-text("Begin")');
        this.loginApplyButton = page.getByText('Log In to Apply', { exact: true });
        this.enterYourPassword = page.locator('[aria-label="Enter Your Password"]');
        this.completeApplicationLink = page.locator('[aria-label="Complete Application"]');
        this.editExtracurricularButton = page.locator('//span[contains(@class, "mantine-Text-root") and text()="Extracurricular Activities"]/ancestor::div[contains(@class, "mantine-Group-root")]//a[contains(@class, "mantine-Button-root") and contains(.,"Edit")]');
        this.addEntryButton = page.locator('span.mantine-Button-label:has-text("Add Entry")');
        this.activityName = page.locator('input[placeholder="Short Input"]');
        this.totalYearsInvolved = page.locator('input[placeholder="123"]');
        this.leadershipInput = (index: any) => page.locator(`textarea[name="subFormAnswers.zmy0qL5e-jkdOLt-lU7ts.${index}.answers.WHHCYtxcjT3ihV2tBZrel"]`);
        this.descriptionInput = (indexT: any) => page.locator(`textarea[name="subFormAnswers.zmy0qL5e-jkdOLt-lU7ts.${indexT}.answers.lLq993Pua3MlulxHtDCct"]`);
        this.addButton = page.getByText('Add', { exact: true });
        this.errorMessageOnEntries = page.locator('text=Please add at least 2 entries');
        this.viewApplicationButton = page.getByText('View Applications', { exact: true });
        this.continueButton = page.getByText('Continue', { exact: true });
        this.returnHome = page.getByText('Return Home', { exact: true });
        this.milliseconds = 12000;
        this.editHighSchoolInfo = page.locator('//span[contains(@class, "mantine-Text-root") and text()="High School Information"]/ancestor::div[contains(@class, "mantine-Group-root")]//a[contains(@class, "mantine-Button-root") and contains(.,"Edit")]');
        this.editHighSchoolInfoPara = page.locator('//span[contains(@class, "mantine-Text-root") and text()="High School Information"]/ancestor::div[contains(@class, "mantine-Group-root")]//a[contains(@class, "mantine-Button-root") and contains(.,"Edit")]/following-sibling::p');
        this.highSchoolName = page.locator('input[name="contact.highSchoolName"]');
        this.highSchoolStreetAddress = page.locator('input[name="contact.highSchoolAddress"]');
        this.highSchoolCity = page.locator('input[name="contact.highSchoolCity"]');
        this.highSchoolState = page.locator('input[placeholder="Enter high school state"]');
        this.highSchoolZipCode = page.locator('input[name="fDhCyNNnv_jcmp6xsQQws"]');
        this.gpa = page.locator('input[name="contact.gpa"]');
        this.yearOfHighSchool = page.locator('input[placeholder="Enter a date"]');
        this.stateDropdownArrow = page.locator('div[data-position="right"] .mantine-ComboboxChevron-chevron');
        this.incrementGpaButton = page.locator('button[data-direction="up"]');
        this.decrementGpaButton = page.locator('button[data-direction="down"]');
        this.submitBtn = page.locator('button[type="submit"]');
        this.uploadFile = page.locator('input[type="file"]');
        this.editEssayButton = page.locator('//span[contains(@class, "mantine-Text-root") and text()="Essay"]/ancestor::div[contains(@class, "mantine-Group-root")]//a[contains(@class, "mantine-Button-root") and contains(.,"Edit")]');
        this.editEssayButtonPara = page.locator('//span[contains(@class, "mantine-Text-root") and text()="Essay"]/ancestor::div[contains(@class, "mantine-Group-root")]//a[contains(@class, "mantine-Button-root") and contains(., "Edit")]/following-sibling::p');
        this.checkboxes = page.locator('input[type="checkbox"]');
        this.inputBox = page.locator('[placeholder="Long Input"]');
        this.textAreaForAnimal = page.locator('label:has-text("Essay about Animals") + textarea[placeholder="Long Input"]');
        this.saveButton = page.getByText('Save', { exact: true });
        this.submitFinalBtn = page.locator('text=Submit');
    }

    async refreshPage() {
        await this.page.reload();
    }

    async navigateToLandingPage(url: string) {
        await this.page.goto(url, { timeout: 45 * 1000 });
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

    async navigateToNewApplicationPage(url: string, inputEmail: any, password: any) {
        await this.page.goto(url, { timeout: 45 * 1000 });
        await this.loginApplyButton.click();
        await this.inputEmailAddress(inputEmail);
        await this.enterYourPassword.fill(password);
        await this.nextButton.click();
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


    async completeTheApplication() {
        await this.completeApplicationLink.click();
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

    async clickViewApplication() {
        await this.viewApplicationButton.click();
        await this.continueButton.click();
    }

    async navigateUrl(url) {
        console.log(`Navigating to: ${url}`);
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        await this.page.waitForURL(url, { timeout: 40000 });
    }


    async clickReturnHome() {
        await this.returnHome.click();
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

    async clickUpload(filePath) {
        await this.page.setInputFiles('input[type="file"]', filePath);
        await this.page.waitForTimeout(this.milliseconds);
    }

    async editEssayButtonToUpdateInfo() {
        await this.editEssayButton.click();
    }

    async verifyEssayCheckboxes() {
        const essayTitles = ['Cars', 'Animals', 'School', 'Other'];
        for (let i = 0; i < essayTitles.length; i++) {
            const checkbox = this.page.locator(`input[type="checkbox"][value="${essayTitles[i]}"]`);
            await checkbox.click();
            await expect(checkbox).toBeChecked();
            await expect(this.inputBox).toBeVisible();
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        }
    }

    async fillInfoForAnimalCheckbox() {
        let checkboxForAnimal = this.page.locator(`input[type="checkbox"][value="Animals"]`);
        await checkboxForAnimal.check();
        await this.inputBox.fill('Enter Info');
        await this.saveButton.click();
        await checkboxForAnimal.uncheck();
        await this.saveButton.click();
    }


    async fillInfoForSchoolCheckbox() {
        let checkboxForSchool = this.page.locator(`input[type="checkbox"][value="School"]`);
        let checkboxForAnimal = this.page.locator(`input[type="checkbox"][value="Animals"]`);
        await checkboxForSchool.check();
        await this.inputBox.fill('Enter Info');
        await this.saveButton.click();
        await checkboxForAnimal.check();
        await this.saveButton.click();
    }

    async validateResponseCount() {
        const highSchoolCountText = await this.editHighSchoolInfoPara.textContent();
        const essayButtonCountText = await this.editEssayButtonPara.textContent();
        const highSchoolCount = parseInt(highSchoolCountText, 10);
        const essayButtonCount = parseInt(essayButtonCountText, 10);
        expect(highSchoolCount).toBeGreaterThan(1);
        expect(essayButtonCount).toBeGreaterThan(1);
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