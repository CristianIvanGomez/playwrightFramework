import { expect, test } from '@playwright/test';


test('Validates authentication error message when fill incorrect user name', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await page.locator("input[id='username']").fill('rahulshettyacademys');
    await page.locator("#password").fill('learning');
    await page.locator("//input[@type='submit']").click();
    const alertText = await page.locator("//div[contains(@class,'aler')]");
    const alertTextContent = await alertText.textContent() ?? '';
    await expect(alertText).toBeVisible();
    await expect(alertText).toContainText(alertTextContent);
    await page.locator("input[id='username']").clear();
    await page.screenshot({ path: 'pagina.png' });
   
} );

test('Validates the first product title', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await page.locator("input[id='username']").fill('rahulshettyacademy');
    await page.locator("#password").fill('Learning@830$3mK2');
    await page.locator("//input[@type='submit']").click();
    const getProduct = await page.locator(".card-body a");//locator("(//div[contains(@class,'card-body')]//h4)[1]");
    const getFirstProductText = await getProduct.first().textContent() ?? '';
    const getThirdProductText = await getProduct.nth(2).textContent() ?? '';
    await expect(getProduct.first()).toBeVisible();
    await expect(getFirstProductText).toEqual('iphone X');
    await expect(getProduct.first()).toContainText(getFirstProductText);
    await expect(getThirdProductText).toEqual('Nokia Edge');
    await expect(getProduct.nth(2)).toContainText(getThirdProductText);
    await page.screenshot({ path: 'pagina.png' });
} );

test('Validates all product titles', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const usernameLocator =  page.locator("input[id='username']");
    const passwordLocator =  page.locator("#password");
    const submitButtonLocator =  page.locator("//input[@type='submit']");
    const getProducts =  page.locator(".card-body a");//locator("(//div[contains(@class,'card-body')]//h4)[1]");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await usernameLocator.fill('rahulshettyacademy');
    await passwordLocator.fill('Learning@830$3mK2');
    await submitButtonLocator.click();
    await page.waitForSelector('.card-body h4');
    const getAllProductText = await getProducts.allTextContents();
    console.log(getAllProductText);
    await page.screenshot({ path: 'pagina.png' });
} );



test('Validate dropdowns', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await page.locator("input[id='username']").fill('rahulshettyacademys');
    await page.locator("#password").fill('learning');
    const radioButtonLocator =  page.locator("input[type='radio']");
    await radioButtonLocator.last().click();
    const modelConfirmationLocator =  page.locator(".modal-dialog .modal-content");
    await expect(modelConfirmationLocator).toBeVisible();
    await modelConfirmationLocator.locator("[id='okayBtn']").click();
    await radioButtonLocator.last().isChecked();
    await expect(radioButtonLocator.last()).toBeChecked();
    const termsAndConditionsLocator =  page.locator("[id='terms']");
    expect(await termsAndConditionsLocator.isChecked()).toBe(false);
    await expect(termsAndConditionsLocator).not.toBeChecked();
    await termsAndConditionsLocator.check();
    await expect(termsAndConditionsLocator).toBeChecked();
    await termsAndConditionsLocator.uncheck();
    await expect(termsAndConditionsLocator).not.toBeChecked();
    const blinkingTextLocator =  page.locator("[class='blinkingText']");
    await expect(blinkingTextLocator.first()).toContainClass('blinkingText');
    await expect(blinkingTextLocator.first()).toHaveAttribute('class', 'blinkingText');
    const dropdownLocator =  page.locator("select.form-control");
    await expect(dropdownLocator).toBeVisible();
    await dropdownLocator.selectOption('consult');
    const selectedOption = await dropdownLocator.inputValue();
    await expect(selectedOption).toEqual('consult');
    await page.locator("//input[@type='submit']").click();
    await page.screenshot({ path: 'pagina.png' });
} );

test('child windows handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    const newPagelink =  page.locator("//a[contains(text(),'Free Access')]");
   
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        newPagelink.click(),
    ]);

    const getNewPageEmail = await newPage.locator("//p[@class='im-para red']").textContent();
    const splitText = await (getNewPageEmail ?? '').split("@");
} );

