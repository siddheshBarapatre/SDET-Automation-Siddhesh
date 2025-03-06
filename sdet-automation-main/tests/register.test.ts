const { test, expect } = require('@playwright/test');
const { Locators } = require('../Pages/Locators');
import * as fs from 'fs/promises';


async function loadTestData(user: string) {
  const data = await fs.readFile('./loginInfo.json', 'utf-8');
  return JSON.parse(data)[user];
}

test('Register a new user', async ({ page }) => {
  test.setTimeout(100000);
  const testData = await loadTestData('user1');
    const locators = new Locators(page);
  const randomNum = Math.floor(Math.random() * 1000000);
  const testEmail = `abc+${randomNum}@example.com`;
  await fs.writeFile('./tempEmail.json', JSON.stringify({ email: testEmail }));

  await test.step('1. You navigate to the landing page', async () => {
    await locators.navigateToLandingPage(testData.landingPageurl);
  });

  await test.step('2. You enter the email address and click Next', async () => {
    await locators.inputEmailAddress(testEmail);
  });

  await test.step('3. Enter all the required fields and click submit to complete registration', async () => {
    await locators.fillSignupForm(
      testData.firstName,
      testData.lastName,
      testData.phoneInput,
      testData.password)
    await locators.clickSubmitOnSignup();
    await page.waitForEvent('domcontentloaded');
  });
});
