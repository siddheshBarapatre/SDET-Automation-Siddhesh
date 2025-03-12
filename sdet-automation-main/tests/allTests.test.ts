import { test } from '@playwright/test';
import { AddressPage } from '../pages/addressPage';
import { RegisterPage } from '../pages/registerPage';
import { ExtracurricularPage } from '../pages/extracurricularPage';
import { HighSchoolInfoPage } from '../pages/highSchoolInfoPage';
import { EssayPage } from '../pages/essayPage';
import { SubmitApplicationPage } from '../pages/submitApplicationPage';
import { CommonMethodsPage } from '../pages/commonMethodsPage';
import * as fs from 'fs/promises';
import * as path from 'path';

async function loadTestData(user: string, fileName: string) {
    const data = await fs.readFile(path.resolve(__dirname, `../resources/${fileName}.json`), 'utf-8');
    return JSON.parse(data)[user];
}

async function loadCommonData() {
    const comData = await fs.readFile(path.resolve(__dirname, '../resources/commonData.json'), 'utf-8');
    return JSON.parse(comData);
}

async function loadTempEmail() {
    const tempData = await fs.readFile(path.resolve(__dirname, '../resources/tempEmail.json'), 'utf-8');
    return JSON.parse(tempData);
}

// run the following command to install the dependencies
// npm install @types/node --save-dev

// npx playwright test ./tests/allTests.test.ts --headed

// Register a new user test
test.describe.configure({ mode: 'serial' });
test('Register a new user', async ({ page }) => {
    test.setTimeout(100000);
    const comData = await loadCommonData();
    const testData = await loadTestData('user1', 'register');
    const register = new RegisterPage(page);

    const testEmail = `abc+${Math.floor(Math.random() * 1000000)}@example.com`;
    await fs.writeFile(path.resolve(__dirname, '../resources/tempEmail.json'), JSON.stringify({ testEmail }), 'utf-8');

    const tempData = await loadTempEmail();

    await register.navigateToLandingPage(comData.applicationPageUrl);

    await register.fillRegistrationForm(
        testData.firstName,
        testData.lastName,
        tempData.testEmail,
        testData.phoneInput,
        comData.password
    );
    await register.submitRegistrationForm();
});

// Fill out application form with address details test
test('Fill out application form with address details', async ({ page }) => {
    test.setTimeout(100000);
    const comData = await loadCommonData();
    const testData = await loadTestData('user1', 'address');
    const tempData = await loadTempEmail();

    const addressPage = new AddressPage(page);
    const commonMethodsPage = new CommonMethodsPage(page);


    await commonMethodsPage.navigateToAddressPage(comData.applicationPageUrl, tempData.testEmail, comData.password);

    await addressPage.fillAddressForm(
        testData.streetAddress,
        testData.city,
        testData.state,
        testData.zipCode,
        testData.country
    );
    await addressPage.submitAddressForm();
});

// Add extracurricular activities test
test('Add extracurricular activities', async ({ page }) => {
    test.setTimeout(100000);
    const comData = await loadCommonData();
    const testData = await loadTestData('user1', 'extracurricular');
    const activities = testData.extracurricularActivities;
    const tempData = await loadTempEmail();

    const extracurricularPage = new ExtracurricularPage(page);
    const commonMethodsPage = new CommonMethodsPage(page);

    await commonMethodsPage.navigateToAddressPage(comData.applicationPageUrl, tempData.testEmail, comData.password);
    await commonMethodsPage.clickReturnHome();
    await commonMethodsPage.clickViewApplication();

    await extracurricularPage.editExtracurricularActivities();
    await extracurricularPage.addEntriesForExtraCurricular();
    await extracurricularPage.fillExtracurricularForm(
        activities[0].activityName,
        activities[0].years,
        activities[0].leadership,
        activities[0].description,
        0,
        0
    );
    await extracurricularPage.submitExtracurricularForm();
    for (let i = 1; i < activities.length; i++) {
        await extracurricularPage.addEntriesForExtraCurricular();
        await extracurricularPage.fillExtracurricularForm(
            activities[i].activityName,
            activities[i].years,
            activities[i].leadership,
            activities[i].description,
            i,
            i
        );
    }
    await extracurricularPage.verifyErrorMessageHidden();
});

// Upload the transcript test
test('Upload the transcript', async ({ page }) => {
    test.setTimeout(100000);
    const comData = await loadCommonData();
    const testData = await loadTestData('user1', 'highSchoolInfo');
    const tempData = await loadTempEmail();
    const filePath = path.join(__dirname, '../resources/attachData/MySchoolTranscript.pdf');

    const highSchoolInfoPage = new HighSchoolInfoPage(page);
    const commonMethodsPage = new CommonMethodsPage(page);

    await commonMethodsPage.navigateToAddressPage(comData.applicationPageUrl, tempData.testEmail, comData.password);
    await commonMethodsPage.clickReturnHome();
    await commonMethodsPage.clickViewApplication();

    await highSchoolInfoPage.editHighSchoolInfo();
    await highSchoolInfoPage.fillHighSchoolInfo(
        testData.highSchoolName,
        testData.highSchoolStreetAddress,
        testData.highSchoolCity,
        testData.highSchoolState,
        testData.highSchoolZipCode,
        testData.gpa,
        testData.yearOfHighSchool
    );
    await highSchoolInfoPage.uploadTranscript(filePath);
    await highSchoolInfoPage.submitHighSchoolInfoForm();
});


// Select Essay and add information in it test
test('Select Essay and add information in it', async ({ page }) => {
    test.setTimeout(100000);
    const comData = await loadCommonData();
    const testData = await loadTestData('user1', 'essay');
    const tempData = await loadTempEmail();

    const essayPage = new EssayPage(page);
    const commonMethodsPage = new CommonMethodsPage(page);

    await commonMethodsPage.navigateToAddressPage(comData.applicationPageUrl, tempData.testEmail, comData.password);
    await commonMethodsPage.clickReturnHome();
    await commonMethodsPage.clickViewApplication();

    await essayPage.editEssay();
    await essayPage.verifyEssayCheckboxes();
    await essayPage.fillInfoForAnimalCheckbox(testData.animal, testData.essayAboutAnimals);
    await essayPage.fillInfoForSchoolCheckbox(testData.school, testData.animal, testData.essayAboutSchool);
    await essayPage.submitEssayForm();
});


// Submit the application test
test('Submit the application', async ({ page }) => {
    test.setTimeout(100000);
    const comData = await loadCommonData();
    const tempData = await loadTempEmail();

    const submitApplicationPage = new SubmitApplicationPage(page);
    const commonMethodsPage = new CommonMethodsPage(page);

    await commonMethodsPage.navigateToAddressPage(comData.applicationPageUrl, tempData.testEmail, comData.password);
    await commonMethodsPage.clickReturnHome();
    await commonMethodsPage.clickViewApplication();

    await submitApplicationPage.reviewApplication();
    await submitApplicationPage.submitApplicationForm();
    await submitApplicationPage.verifySubmissionSuccess();
});
