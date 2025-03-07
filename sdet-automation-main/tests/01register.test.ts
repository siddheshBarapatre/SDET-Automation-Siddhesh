import { test } from '@playwright/test';
import { registerPage } from '../pages/registerPage';
import * as fs from 'fs/promises';
import * as path from 'path';

async function loadTestData(user: string) {
  const data = await fs.readFile(path.resolve(__dirname, '../resources/register.json'));
  return JSON.parse(data.toString())[user];
}
//run commands:-  npx playwright test ./tests/ --headed --workers=1
test('Register a new user', async ({ page }) => {
  test.setTimeout(100000);
  const testData = await loadTestData('user1');
  const register = new registerPage(page);
  const comData = JSON.parse(await fs.readFile(path.resolve(__dirname, '../resources/commonData.json'), 'utf-8'));
  const testEmail = `kyc+${Math.floor(Math.random() * 1000000)}@example.com`;
  await fs.writeFile(path.resolve(__dirname, '../resources/tempEmail.json'), JSON.stringify({ testEmail }), 'utf-8');

  await test.step('1. navigate to the landing page', async () => {
    await register.navigateToLandingPage(comData.applicationPageUrl);
  });

  await test.step('2. enter the email address and click Next', async () => {
    await register.inputEmailAddress(testEmail);
  });

  await test.step('3. Enter all the required fields and click submit to complete registration', async () => {
    await register.fillSignupForm(
      testData.firstName,
      testData.lastName,
      testData.phoneInput,
      comData.password)
    await register.clickSubmitOnSignup();
    await page.waitForEvent('domcontentloaded');
  });
});