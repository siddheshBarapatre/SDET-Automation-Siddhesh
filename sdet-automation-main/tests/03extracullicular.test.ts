import { test } from '@playwright/test';
import { extracullicularPage } from '../pages/extracullicularPage';
import commonMethods from '../utils/commonMethods';
import * as fs from 'fs/promises';
import path from 'path';

async function loadTestData(user: string) {
    const data = await fs.readFile(path.resolve(__dirname, '../resources/extracullicular.json'));
    return JSON.parse(data.toString())[user];
}

test('Add extracullicular activities', async ({ page }) => {
    test.setTimeout(100000);
    const testData = await loadTestData('user1');
    const activities = testData.extracurricularActivities;
    const extracullicular = new extracullicularPage(page);
    const comData = JSON.parse(await fs.readFile(path.resolve(__dirname, '../resources/commonData.json'), 'utf-8'));
    const tempData = JSON.parse(await fs.readFile(path.resolve(__dirname, '../resources/tempEmail.json'), 'utf-8'));

    await test.step('1.Navigate to the application page', async () => {
        commonMethods.navigateToNewApplicationPage(page, comData.applicationPageUrl, tempData.testEmail, comData.password);
        commonMethods.clickReturnHome(page);
        commonMethods.clickViewApplication(page);
    });

    await test.step('2. Edit the extracullicular activites using the edit button', async () => {
        await extracullicular.editExtracurricularActivities();
    });

    await test.step('3. Add one entry and click next page and verify error message', async () => {
        await extracullicular.addEntriesForExtraCurricular();
        await extracullicular.fillExtracurricularDetails(
            activities[0].activity,
            activities[0].years,
            activities[0].leadership,
            activities[0].description,
            0,
            0
        );
        await extracullicular.clickNextPageButton();
        await extracullicular.verifyErrorMessage();
    });

    await test.step('4. Add remaining activities', async () => {
        for (let i = 1; i < activities.length; i++) {
            await extracullicular.addEntriesForExtraCurricular();
            await extracullicular.fillExtracurricularDetails(
                activities[i].activity,
                activities[i].years,
                activities[i].leadership,
                activities[i].description,
                i,
                i
            );
        }
    });

    await test.step('5. Verify error message is hidden', async () => {
        await extracullicular.verifyErrorMessageHidden();
        await extracullicular.clickNextPageButton();
    });
});