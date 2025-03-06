const { test, expect } = require('@playwright/test');
const { Locators } = require('../Pages/Locators');
import * as fs from 'fs/promises';
import path from 'path';


async function loadTestData(user: string) {
    const data = await fs.readFile('./loginInfo.json', 'utf-8');
    return JSON.parse(data)[user];
}

test('Upload the transcript', async ({ page }) => {
    test.setTimeout(100000);
    const testData = await loadTestData('user1');
    const locators = new Locators(page);
    const tempData = JSON.parse(await fs.readFile('./tempEmail.json', 'utf-8'));
    const filePath = path.join(__dirname, 'MySchoolTranscript.pdf');

    await test.step('1.Navigate to the application page', async () => {
        await locators.navigateToNewApplicationPage(testData.applicationPageUrl, tempData.email, testData.password);
        await locators.clickReturnHome();
        await locators.navigateUrl(testData.applicationPageUrl);
        await locators.clickViewApplication();
    });

    await test.step('2.Edit the highSchool information activites using the edit button', async () => {
        await locators.editHighSchoolInformation();
    });

    await test.step('3.Enter all the details and upload transcript', async () => {
        await locators.fillHighSchoolInfo(
            testData.highSchoolName,
            testData.highSchoolStreetAddress,
            testData.highSchoolCity,
            testData.highSchoolState,
            testData.highSchoolZipCode,
            testData.gpa,
            testData.yearOfHighSchool
        );
        await locators.clickUpload(filePath);
        await locators.clickNextPageButton();
    });
});