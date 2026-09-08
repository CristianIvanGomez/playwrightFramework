import { expect, test } from '@playwright/test';
import { AngularDashboard } from '../../pages/Angular Practice/angularDashboardPage';

test('Navigate to new angular web URL', async ({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const AngularPractice = new AngularDashboard(page);
    await AngularPractice.navigateToAngularWebSite();
    await AngularPractice.fillMandatoryFields();
    await page.waitForLoadState('networkidle');
    await AngularPractice.validateSuccessToastMessage(" The Form has been submitted successfully!.");
    await page.screenshot({ path: 'pagina.png' });
    });

    test('Navigate to Shop section', async ({browser}) =>{
    //time out for test to be done    
    test.setTimeout(60000);
    const context = await browser.newContext();
    const page = await context.newPage();
    //Wait for all action to be done replace the wait on config file
    page.setDefaultTimeout(9000);
    const AngularPractice = new AngularDashboard(page);
    await AngularPractice.navigateToAngularWebSite();
    await AngularPractice.fillMandatoryFields();
    await AngularPractice.navigateToShopScreen();
    await AngularPractice.getSpecificProduct();
    await page.screenshot({ path: 'pagina.png' });
    });

    

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'Nokia Edge $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
  await expect(page.locator('#navbarResponsive')).toMatchAriaSnapshot(`- text: Checkout ( 2 ) (current)`);
  await page.getByText('Checkout ( 2 ) (current)').click();
  await expect(page.locator('tbody')).toContainText('₹. 150000');
  await expect(page.locator('tbody')).toContainText('₹. 65000');
  await expect(page.locator('tbody')).toContainText('₹. 85000');
  await expect(page.locator('tbody')).toContainText('Checkout');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page.locator('app-checkout')).toContainText('Please choose your delivery location. Then click on purchase button');
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('Mexico');
  await page.getByText('I agree with the term &').click();
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.locator('app-checkout')).toContainText('× Success! Thank you! Your order will be delivered in next few weeks :-).');
  await page.screenshot({ path: 'pagina.png' });
});