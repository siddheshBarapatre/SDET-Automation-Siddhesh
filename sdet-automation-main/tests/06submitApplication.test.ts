import { test } from '@playwright/test';
import { submitApplicationPage } from '../pages/submitApplicationPage';
import commonMethods from '../utils/commonMethods';
import * as fs from 'fs/promises';
import path from 'path';

test('Submit the application ', async ({ page }) => {
    test.setTimeout(100000);
    const submitApplication = new submitApplicationPage(page);
    const comData = JSON.parse(await fs.readFile(path.resolve(__dirname, '../resources/commonData.json'), 'utf-8'));
    const tempData = JSON.parse(await fs.readFile(path.resolve(__dirname, '../resources/tempEmail.json'), 'utf-8'));

    await test.step('1.Navigate to the application page', async () => {
        commonMethods.navigateToNewApplicationPage(page, comData.applicationPageUrl, tempData.testEmail, comData.password);
        commonMethods.clickReturnHome(page);
        commonMethods.clickViewApplication(page);
    });

    await test.step('2.User clicks the submit button', async () => {
        await submitApplication.submitTheApplicationButton();
    });

    await test.step('3.Validate editing is not allowed', async () => {
        await submitApplication.completeTheApplication();
        await submitApplication.editButtonNotVisible();
    });
});