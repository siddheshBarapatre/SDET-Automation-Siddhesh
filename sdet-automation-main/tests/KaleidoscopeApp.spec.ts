import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ApplicationPage } from '../pages/applicationPage';
import comData from '../resources/commonData.json';
import tempEmail from '../resources/tempEmail.json';
import * as fs from 'fs/promises';
import * as path from 'path';

//run command:- npx playwright test ./tests/
test('Register a new User, complete the application and validate Application', async ({ page }) => {
    test.setTimeout(1500000);
    const loginPage = new LoginPage(page);
    const applicationPage = new ApplicationPage(page);

    const filePath = path.join(__dirname, '../resources/attachData/MySchoolTranscript.pdf');

    const testEmail = `abc${Math.floor(Math.random() * 1000000)}@example.com`;
    await fs.writeFile(path.resolve(__dirname, '../resources/tempEmail.json'), JSON.stringify({ testEmail }), 'utf-8');

    await test.step('1.Navigate to the application page', async () => {
        // Navigate to the application page 
        await loginPage.navigateToTheApplicationPage(comData.applicationPageUrl);

        // Register a new user
        await loginPage.registerNewUser(comData.newUser.firstName, comData.newUser.lastName, tempEmail.testEmail, comData.newUser.phoneInput, comData.password);
    });

    await test.step('2.Begin a new application and Fill out all required fields', async () => {
        // Begin a new application
        await applicationPage.beginNewApplication();

        // Page 1: Fill out all required fields
        await applicationPage.fillOutAllRequiredFields(comData.newUser.streetAddress, comData.newUser.city, comData.newUser.state, comData.newUser.zipCode, comData.newUser.country);
    });

    await test.step('3.Provide Extracurricular Activities and Validate', async () => {
        // Page 2: Validate extracurricular activities requirement
        // Validate that at least 2 Extracurricular Activities are required
        await applicationPage.validateAtLeast2ExtracurricularActivitiesRequired(
            comData.extracurricularActivities[0].activityName,
            comData.extracurricularActivities[0].years,
            comData.extracurricularActivities[0].leadership,
            comData.extracurricularActivities[0].description,
        )

        // Provide 4 Extracurricular Activities
        for (let i = 1; i < comData.extracurricularActivities.length; i++) {
            await applicationPage.provide4ExtracurricularActivities(
                comData.extracurricularActivities[i].activityName,
                comData.extracurricularActivities[i].years,
                comData.extracurricularActivities[i].leadership,
                comData.extracurricularActivities[i].description,
            );
        }

        // Save and proceed to the next page
        await applicationPage.saveAndNext('Add Entry');
    });

    await test.step('4.Fill out the form and upload the school transcript', async () => {
        // Page 3: Fill out the form and upload the school transcript
        await applicationPage.fillOutFormAndUploadSchoolTranscript(comData.school.name, comData.school.address, comData.school.city, comData.school.state, comData.school.zipcode, comData.school.gpa, comData.school.year, filePath)
        await applicationPage.saveAndNext('High School Information');
    });

    await test.step('5.Validate essay options and provide answers', async () => {
        // Page 4: Validate essay options and provide answers
        // Validate that each option under "Please select the essay types you want to write about” shows an essay box
        await applicationPage.validateEachOptionShowsEssayBox();

        // Provide Answers to the Two selected Essay Questions
        await applicationPage.provideEssayAnswer(comData.essays.animal, comData.essays.essayAboutAnimals);
        await applicationPage.provideEssayAnswer(comData.essays.school, comData.essays.essayAboutSchool);
        await applicationPage.checkedEssayBox();

        // Save and proceed to the next page
        await applicationPage.saveAndNext("Essay");
    });

    await test.step('6.Validate pages and answers', async () => {
        // Review Page: Validate pages and answers
        await applicationPage.validateLetsGetToKnowYou(comData.newUser.firstName, comData.newUser.lastName, tempEmail.testEmail, comData.newUser.streetAddress, comData.newUser.city, comData.newUser.state, comData.newUser.zipCode, comData.newUser.country);
        for (let i = 1; i < comData.extracurricularActivities.length; i++) {
            await applicationPage.validateExtracurricularActivities(
                comData.extracurricularActivities[i].activityName,
            );
        }
        await applicationPage.validateHighSchoolInformation(comData.school.name, comData.school.address, comData.school.city, comData.school.state, comData.school.zipcode, comData.school.gpa, comData.school.year);
        await applicationPage.validateEssay(comData.essays.animal, comData.essays.essayAboutAnimals, comData.essays.school, comData.essays.essayAboutSchool);
    });

    await test.step('7.Submit Application', async () => {
        // Submit Application
        await applicationPage.submitApplication();
    });

    await test.step('8.Validate editing is not allowed after submission', async () => {
        // Validate editing is not allowed after submission
        await applicationPage.editButtonNotVisible();
    });
});