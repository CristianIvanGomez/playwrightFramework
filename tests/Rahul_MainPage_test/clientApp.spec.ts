import { test, expect } from '../../fixtures/pageFixtures';

test('Get products from Rahul Shetty Academy client webpage', async ({ browser, loginPage }) => {
     //const context = await browser.newContext();
     //const page = await context.newPage();
    // const emailLocator =  page.locator("input[id='userEmail']");
    // const passwordLocator =  page.locator("input[id='userPassword']");
    // const registerHeadTitleLocator =  page.locator("[class='login-title']");
    // const submitButtonLocator =  page.locator("//input[@type='submit']");
    //const productCardsLocator =  page.locator("[class='container'] .card");
    // await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    // await expect(page).toHaveTitle("Let's Shop");
    // await expect(registerHeadTitleLocator).toHaveText("Log in");
    await loginPage.loginToEventPage();
    
    // await emailLocator.fill('anaack25@gmail.com');
    // await passwordLocator.fill('AnaAck@2');
    // await submitButtonLocator.click();
    //await page.waitForLoadState('networkidle');
    
    // const getProductCardsCount = await productCardsLocator.count();
    // const getProductsTitles = await page.locator('[class="container"] .card b').allTextContents();
    // await page.screenshot({ path: 'pagina.png' });
    //  console.log( "Product Titles found: " + getProductsTitles + " Total product cards found:" + getProductCardsCount);
} );

test('Complete user registration on Rahul Shetty Academy client webpage', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const lastNameLocator =  page.locator("input[id='lastName']");
    const firstNameLocator =  page.locator("input[id='firstName']");
    const emailLocator =  page.locator("input[id='userEmail']");
    const phoneNumberLocator =  page.locator("input[id='userMobile']");
    const occupationLocator =  page.locator("select[formcontrolname='occupation']");
    const generFemaleLocator =  page.locator("input[value='Female']");
    const generMaleLocator =  page.locator("input[value='Male']");
    const passwordLocator =  page.locator("input[id='userPassword']");
    const confirmPasswordLocator =  page.locator("input[id='confirmPassword']");
    const olderThan18Locator =  page.locator("[formcontrolname='required']");
    const registerHeadTitleLocator =  page.locator("[class='login-title']");
    const submitButtonLocator =  page.locator("//input[@type='submit']");
    const registerHereLocator =  page.locator("//a[contains(text(),'Register here')]");
    const successMessageLocator =  page.locator("[class='login-section-wrapper']");
    const loginButtonLocator =  page.locator(" [class='btn btn-primary']");
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await expect(page).toHaveTitle("Let's Shop");
    await expect(registerHeadTitleLocator).toHaveText("Log in");
    await registerHereLocator.click();
    await expect(registerHeadTitleLocator).toHaveText("Register");
    await firstNameLocator.fill('cristian');
    await lastNameLocator.fill('Martyn');
    await emailLocator.fill('anaack25@gmail.com.com');
    await phoneNumberLocator.fill('1234567890');
    await occupationLocator.selectOption('Engineer');
    await generFemaleLocator.click();
    await passwordLocator.fill('AnaAck@2');
    await confirmPasswordLocator.fill('AnaAck@2');
    await olderThan18Locator.click();
    await submitButtonLocator.click();
    await expect(successMessageLocator).toHaveText("Account Created SuccessfullyLogin");
    await expect(loginButtonLocator).toBeVisible();
    await page.screenshot({ path: 'pagina.png' });
} );