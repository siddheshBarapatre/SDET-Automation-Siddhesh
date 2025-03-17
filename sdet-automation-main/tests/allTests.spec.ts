import { test, expect } from '@playwright/test';
import { CommonMethodsPage } from '../pages/commonPage';
import comData from '../resources/commonData.json';
import tempEmail from '../resources/tempEmail.json';
import * as fs from 'fs/promises';
import * as path from 'path';

//run command:- npx playwright test ./tests/
test('Register a new User and complete the application', async ({ page }) => {
    test.setTimeout(1500000);
    const commonPage = new CommonMethodsPage(page);

    const filePath = path.join(__dirname, '../resources/attachData/MySchoolTranscript.pdf');

    const testEmail = `abc${Math.floor(Math.random() * 1000000)}@example.com`;
    await fs.writeFile(path.resolve(__dirname, '../resources/tempEmail.json'), JSON.stringify({ testEmail }), 'utf-8');

    // Navigate to the application page 
    await commonPage.navigateToTheApplicationPage(comData.applicationPageUrl);

    // Register a new user
    await commonPage.registerNewUser(comData.newUser.firstName, comData.newUser.lastName, tempEmail.testEmail, comData.newUser.phoneInput, comData.password);

    // Begin a new application
    await commonPage.beginNewApplication();

    // Page 1: Fill out all required fields
    await commonPage.fillOutAllRequiredFields(comData.newUser.streetAddress, comData.newUser.city, comData.newUser.state, comData.newUser.zipCode, comData.newUser.country);

    // Page 2: Validate extracurricular activities requirement
    // Validate that at least 2 Extracurricular Activities are required
    await commonPage.validateAtLeast2ExtracurricularActivitiesRequired(
        comData.extracurricularActivities[0].activityName,
        comData.extracurricularActivities[0].years,
        comData.extracurricularActivities[0].leadership,
        comData.extracurricularActivities[0].description,
    )

    // Provide 4 Extracurricular Activities
    for (let i = 1; i < comData.extracurricularActivities.length; i++) {
        await commonPage.provide4ExtracurricularActivities(
            comData.extracurricularActivities[i].activityName,
            comData.extracurricularActivities[i].years,
            comData.extracurricularActivities[i].leadership,
            comData.extracurricularActivities[i].description,
        );
    }

    // Save and proceed to the next page
    await commonPage.saveAndNext('Add Entry');

    // Page 3: Fill out the form and upload the school transcript
    await commonPage.fillOutFormAndUploadSchoolTranscript(comData.school.name, comData.school.address, comData.school.city, comData.school.state, comData.school.zipcode, comData.school.gpa, comData.school.year, filePath)
    await commonPage.saveAndNext('High School Information');
    // Page 4: Validate essay options and provide answers
    // Validate that each option under "Please select the essay types you want to write about” shows an essay box
    await commonPage.validateEachOptionShowsEssayBox();

    // Provide Answers to the Two selected Essay Questions
    await commonPage.provideEssayAnswer(comData.essays.animal, comData.essays.essayAboutAnimals);
    await commonPage.provideEssayAnswer(comData.essays.school, comData.essays.essayAboutSchool);
    await commonPage.checkedEssayBox();

    // Save and proceed to the next page
    await commonPage.saveAndNext("Essay");

    // Review Page: Validate pages and answers
    await commonPage.validateLetsGetToKnowYou(comData.newUser.firstName, comData.newUser.lastName, tempEmail.testEmail, comData.newUser.streetAddress, comData.newUser.city, comData.newUser.state, comData.newUser.zipCode, comData.newUser.country);
    for (let i = 1; i < comData.extracurricularActivities.length; i++) {
        await commonPage.validateExtracurricularActivities(
            comData.extracurricularActivities[i].activityName,
        );
    }
    await commonPage.validateHighSchoolInformation(comData.school.name, comData.school.address, comData.school.city, comData.school.state, comData.school.zipcode, comData.school.gpa, comData.school.year);
    await commonPage.validateEssay(comData.essays.animal, comData.essays.essayAboutAnimals, comData.essays.school, comData.essays.essayAboutSchool);

    // Submit Application
    await commonPage.submitApplication();

    // Validate editing is not allowed after submission
    await commonPage.editButtonNotVisible();
});