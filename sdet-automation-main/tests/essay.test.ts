const { test, expect } = require('@playwright/test');
const { Locators } = require('../Pages/Locators');
import * as fs from 'fs/promises';
import path from 'path';


async function loadTestData(user: string) {
    const data = await fs.readFile('./loginInfo.json', 'utf-8');
    return JSON.parse(data)[user];
}

test('Select Essay and add information in it ', async ({ page }) => {
    test.setTimeout(100000);
    const testData = await loadTestData('user1');
 const locators = new Locators(page);
    const tempData = JSON.parse(await fs.readFile('./tempEmail.json', 'utf-8'));

    await test.step('1.Navigate to the application page', async () => {
        await locators.navigateToNewApplicationPage(testData.applicationPageUrl, tempData.email, testData.password);
        await locators.clickReturnHome();
        await locators.navigateUrl(testData.applicationPageUrl);
        await locators.clickViewApplication();
    });

    await test.step('2.Edit the essay using the edit button', async () => {
        await locators.editEssayButtonToUpdateInfo();
    });

    await test.step('3.Check the essay topic', async () => {
        await locators.verifyEssayCheckboxes();
    });

    await test.step('4.Select only Animals and School', async () => {
        await locators.fillInfoForAnimalCheckbox();
        await locators.fillInfoForSchoolCheckbox();
        await locators.clickNextPageButton();
    });

    await test.step('5. Check the response after saving', async () => {
        await locators.validateResponseCount();
    });
});