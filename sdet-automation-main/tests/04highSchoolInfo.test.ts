import { test } from '@playwright/test';
import { highSchoolInfoPage } from '../pages/highSchoolInfoPage';
import commonMethods from '../utils/commonMethods';
import * as fs from 'fs/promises';
import path from 'path';

async function loadTestData(user: string) {
    const data = await fs.readFile(path.resolve(__dirname, '../resources/highSchoolInfo.json'));
    return JSON.parse(data.toString())[user];
}

test('Upload the transcript', async ({ page }) => {
    test.setTimeout(100000);
    const testData = await loadTestData('user1');
    const highSchoolInfo = new highSchoolInfoPage(page);
    const comData = JSON.parse(await fs.readFile(path.resolve(__dirname, '../resources/commonData.json'), 'utf-8'));
    const tempData = JSON.parse(await fs.readFile(path.resolve(__dirname, '../resources/tempEmail.json'), 'utf-8'));
    const filePath = path.join(__dirname, '../resources/attachData/MySchoolTranscript.pdf');

    await test.step('1.Navigate to the application page', async () => {
        commonMethods.navigateToNewApplicationPage(page, comData.applicationPageUrl, tempData.testEmail, comData.password);
        commonMethods.clickReturnHome(page);
        commonMethods.clickViewApplication(page);
    });

    await test.step('2.Edit the highSchool information activites using the edit button', async () => {
        await highSchoolInfo.editHighSchoolInformation();
    });

    await test.step('3.Enter all the details and upload transcript', async () => {
        await highSchoolInfo.fillHighSchoolInfo(
            testData.highSchoolName,
            testData.highSchoolStreetAddress,
            testData.highSchoolCity,
            testData.highSchoolState,
            testData.highSchoolZipCode,
            testData.gpa,
            testData.yearOfHighSchool
        );
        await highSchoolInfo.clickUpload(filePath);
        await highSchoolInfo.clickNextPageButton();
    });
});