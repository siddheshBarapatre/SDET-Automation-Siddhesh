const { test, expect } = require('@playwright/test');
const { Locators } = require('../Pages/Locators');
import * as fs from 'fs/promises';
import path from 'path';


async function loadTestData(user: string) {
    const data = await fs.readFile('./loginInfo.json', 'utf-8');
    return JSON.parse(data)[user];
}

test('Submit the application ', async ({ page }) => {
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

    await test.step('2.User clicks the submit button', async () => {
        await locators.submitTheApplicationButton();
    });

     await test.step('3.Validate editing is not allowed', async () => {
         await locators.completeTheApplication();
         await locators.editButtonNotVisible();
    });
   
});