import { test } from '@playwright/test';
import { addressPage } from '../pages/addressPage';
import commonMethods from '../utils/commonMethods';
import * as fs from 'fs/promises';
import * as path from 'path';

async function loadTestData(user: string) {
  const data = await fs.readFile(path.resolve(__dirname, '../resources/address.json'), 'utf-8');
  return JSON.parse(data)[user];
}

test('Fill out application form with address details', async ({ page }) => {
  test.setTimeout(100000);
  const testData = await loadTestData('user1');
  const address = new addressPage(page);
  const comData = JSON.parse(await fs.readFile(path.resolve(__dirname, '../resources/commonData.json'), 'utf-8'));
  const tempData = JSON.parse(await fs.readFile(path.resolve(__dirname, '../resources/tempEmail.json'), 'utf-8'));
  await test.step('1.Navigate to the application page', async () => {
    commonMethods.navigateToNewApplicationPage(page, comData.applicationPageUrl, tempData.testEmail, comData.password);
  });

  await test.step('2.Fill all the mandatory address details', async () => {
    await address.fillAddressDetails(
      testData.streetAddress,
      testData.state,
      testData.city,
      testData.zipCode,
      testData.country
    );
  });
});