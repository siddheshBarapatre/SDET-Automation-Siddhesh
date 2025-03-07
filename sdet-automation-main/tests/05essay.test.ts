import { test } from '@playwright/test';
import { essayPage } from '../pages/essayPage';
import commonMethods from '../utils/commonMethods';
import * as fs from 'fs/promises';
import path from 'path';


async function loadTestData(user: string) {
    const data = await fs.readFile(path.resolve(__dirname, '../resources/essay.json'));
    return JSON.parse(data.toString())[user];
}

test('Select Essay and add information in it ', async ({ page }) => {
    test.setTimeout(100000);
    const testData = await loadTestData('user1');
    const essay = new essayPage(page);
    const comData = JSON.parse(await fs.readFile(path.resolve(__dirname, '../resources/commonData.json'), 'utf-8'));
    const tempData = JSON.parse(await fs.readFile(path.resolve(__dirname, '../resources/tempEmail.json'), 'utf-8'));

    await test.step('1.Navigate to the application page', async () => {
        commonMethods.navigateToNewApplicationPage(page, comData.applicationPageUrl, tempData.testEmail, comData.password);
        commonMethods.clickReturnHome(page);
        commonMethods.clickViewApplication(page);
    });

    await test.step('2.Edit the essay using the edit button', async () => {
        await essay.editEssayButtonToUpdateInfo();
    });

    await test.step('3.Check the essay topic', async () => {
        await essay.verifyEssayCheckboxes();
    });

    await test.step('4.Select only Animals and School', async () => {
        await essay.fillInfoForAnimalCheckbox(testData.animal, testData.essayAboutAnimals);
        await essay.fillInfoForSchoolCheckbox(testData.school, testData.animal, testData.essayAboutSchool);
        await essay.clickNextPageButton();
    });

    await test.step('5. Check the response after saving', async () => {
        await essay.validateResponseCount();
    });
});