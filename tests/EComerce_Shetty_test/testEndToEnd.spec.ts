import { expect, test } from '@playwright/test';
import { CartProductsPage } from '../../pages/Rahul Page/cartDashboardPage';
import { ProductsPage } from '../../pages/Rahul Page/productsDashboardPage';
import { CheckOutProductsPage } from '../../pages/Rahul Page/thankYouForOrderPage';
import { MyOrdersPage } from '../../pages/Rahul Page/myOrdersDashboardPage';
import { Ejercicios } from '../../pages/Rahul Page/Ejercicios';
import { generateRandomEmail } from '../../helpers/emailGenerator';

test('Correct signin raulshetty e-commerce', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const registerHereLocator =  page.locator("//a[contains(text(),'Register here')]");
    const lastNameLocator =  page.locator("input[id='lastName']");
    const firstNameLocator =  page.locator("input[id='firstName']");
    const emailLocator =  page.getByPlaceholder("email@example.com");//page.locator("input[id='userEmail']");
    const phoneNumberLocator =  page.locator("input[id='userMobile']");
    const occupationLocator =  page.locator("select[formcontrolname='occupation']");
    const generFemaleLocator =  page.locator("input[value='Female']");
    const passwordLocator =  page.locator("input[id='userPassword']");//page.locator("input[id='userPassword']");
    const confirmPasswordLocator =  page.locator("input[formcontrolname='confirmPassword']");
    const olderThan18Locator =  page.locator("[formcontrolname='required']");
    const registerHeadTitleLocator =  page.locator("[class='login-title']");
    const submitButtonLocator =  page.locator("//input[@type='submit']");
    const successMessageLocator =  page.locator("[class='login-section-wrapper']");
    const loginButtonLocator =  page.getByRole("button",{name:"Login"});//page.locator(" [class='btn btn-primary']");
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await expect(page).toHaveTitle("Let's Shop");
    await expect(registerHeadTitleLocator).toHaveText("Log in");
    await registerHereLocator.click();
    await expect(registerHeadTitleLocator).toHaveText("Register");
    await firstNameLocator.fill('cristian');
    await lastNameLocator.fill('Martyn2');
    const email = generateRandomEmail();
    await emailLocator.fill(email);
    await phoneNumberLocator.fill('1234567890');
    await occupationLocator.selectOption('Engineer');
    await generFemaleLocator.click();
    await passwordLocator.waitFor({ state: 'visible' });
    await passwordLocator.fill('AnaAck@2');
    await confirmPasswordLocator.fill('AnaAck@2');
    await olderThan18Locator.click();
    await submitButtonLocator.click();
    await expect(successMessageLocator).toHaveText("Account Created SuccessfullyLogin");
    await expect(loginButtonLocator).toBeVisible();
    await page.screenshot({ path: 'pagina.png' });
} );

test('Add to the cart the first product', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const emailLocator =  page.locator("input[id='userEmail']");
    const passwordLocator =  page.locator("input[id='userPassword']");
    const registerHeadTitleLocator =  page.locator("[class='login-title']");
    const submitButtonLocator =  page.locator("//input[@type='submit']");
    const addToCartButtonLocator =  page.locator("//button[contains(text(),'Add To Cart')]")//("//button[contains(text(),'Cart')]/preceding-sibling::label");
    const addToCartToastMessageLocator =  page.locator("//*[@id='toast-container']//div[contains(text(),' Product Added To Cart')]");
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await expect(page).toHaveTitle("Let's Shop");
    await expect(registerHeadTitleLocator).toHaveText("Log in");
    await emailLocator.fill('anaack26@gmail.com.com');
    await passwordLocator.fill('AnaAck@2');
    await submitButtonLocator.click();
    await page.waitForLoadState('networkidle');
    await expect(addToCartButtonLocator.first()).toBeVisible();
    await addToCartButtonLocator.first().click();
    await expect(addToCartToastMessageLocator).toBeVisible();
    await addToCartToastMessageLocator.waitFor({ state: 'hidden' });
    await page.screenshot({ path: 'pagina.png' });
    const getAddToCartButtonsCount = await page.locator("//button[contains(text(),'Cart')]//following-sibling::label").textContent() ?? '';
    console.log("Total 'Add To Cart' buttons found: " + getAddToCartButtonsCount);
} );

test('Add to the cart various products', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const emailLocator =  page.locator("input[id='userEmail']");
    const passwordLocator =  page.locator("input[id='userPassword']");
    const registerHeadTitleLocator =  page.locator("[class='login-title']");
    const submitButtonLocator =  page.locator("//input[@type='submit']");
    const addToCartButtonLocator =  page.locator("//button[contains(text(),'Add To Cart')]")//("//button[contains(text(),'Cart')]/preceding-sibling::label");
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await expect(page).toHaveTitle("Let's Shop");
    await expect(registerHeadTitleLocator).toHaveText("Log in");
    await emailLocator.fill('anaack26@gmail.com.com');
    await passwordLocator.fill('AnaAck@2');
    await submitButtonLocator.click();
    await page.waitForLoadState('networkidle');
    await expect(addToCartButtonLocator.first()).toBeVisible();
    const productsPage = new ProductsPage(page);
    await productsPage.addAllProductsToCart();
    await page.screenshot({ path: 'pagina.png' });
} );

test('buy now product', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const emailLocator =  page.locator("input[id='userEmail']");
    const passwordLocator =  page.locator("input[id='userPassword']");
    const registerHeadTitleLocator =  page.locator("[class='login-title']");
    const submitButtonLocator =  page.locator("//input[@type='submit']");
    const addToCartButtonLocator =  page.locator("//button[contains(text(),'Add To Cart')]")//("//button[contains(text(),'Cart')]/preceding-sibling::label");
    const cartButtonLocator =  page.locator("//button[@routerlink='/dashboard/cart']");
    const buyNowProductDetailsTextLocator =  page.locator("//div[contains(@class,'item__title')]");
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await expect(page).toHaveTitle("Let's Shop");
    await expect(registerHeadTitleLocator).toHaveText("Log in");
    await emailLocator.fill('anaack26@gmail.com.com');
    await passwordLocator.fill('AnaAck@2');
    await submitButtonLocator.click();
    await page.waitForLoadState('networkidle');
    await expect(addToCartButtonLocator.first()).toBeVisible();
    const productsPage = new ProductsPage(page);
    await productsPage.addAllProductsToCart();
    await productsPage.clickMyCarttButton();
    await page.waitForLoadState('networkidle');
    const cartProductsPage = new CartProductsPage(page);
    await cartProductsPage.buyNowProduct(1);
    await page.waitForLoadState('networkidle');
    await expect(buyNowProductDetailsTextLocator).toHaveText(" ZARA COAT 3 ");
    await page.screenshot({ path: 'pagina.png' });
    } );

    test('Complete purchase', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const emailLocator =  page.locator("input[id='userEmail']");
    const passwordLocator =  page.locator("input[id='userPassword']");
    const registerHeadTitleLocator =  page.locator("[class='login-title']");
    const submitButtonLocator =  page.locator("//input[@type='submit']");
    const addToCartButtonLocator =  page.locator("//button[contains(text(),'Add To Cart')]")//("//button[contains(text(),'Cart')]/preceding-sibling::label");
    const cartButtonLocator =  page.locator("//button[@routerlink='/dashboard/cart']");
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await expect(page).toHaveTitle("Let's Shop");
    await expect(registerHeadTitleLocator).toHaveText("Log in");
    await emailLocator.fill('anaack26@gmail.com.com');
    await passwordLocator.fill('AnaAck@2');
    await submitButtonLocator.click();
    await page.waitForLoadState('networkidle');
    await expect(addToCartButtonLocator.first()).toBeVisible();
     const productsPage = new ProductsPage(page);
    await productsPage.addAllProductsToCart();
    await cartButtonLocator.click();
    await productsPage.clickMyCarttButton();
    await page.waitForLoadState('networkidle');
    await productsPage.clickCheckOutButton();
    const checkOutProductsPage = new CheckOutProductsPage(page);
    await checkOutProductsPage.selectCountryFromList("India");
    await checkOutProductsPage.compareEmails();
    await checkOutProductsPage.fillPersonalInformationForm("456","AnaAck Ord","rahulshettyacademy");
    await checkOutProductsPage.completeOrderPurchase();
    await page.screenshot({ path: 'pagina.png' });
    } );

    test('Validate product list', async ({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const emailLocator =  page.locator("input[id='userEmail']");
    const passwordLocator =  page.locator("input[id='userPassword']");
    const registerHeadTitleLocator =  page.locator("[class='login-title']");
    const submitButtonLocator =  page.locator("//input[@type='submit']");
    const addToCartButtonLocator =  page.locator("//button[contains(text(),'Add To Cart')]")//("//button[contains(text(),'Cart')]/preceding-sibling::label");
    const cartButtonLocator =  page.locator("//button[@routerlink='/dashboard/cart']");
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await expect(page).toHaveTitle("Let's Shop");
    await expect(registerHeadTitleLocator).toHaveText("Log in");
    await emailLocator.fill('anaack26@gmail.com.com');
    await passwordLocator.fill('AnaAck@2');
    await submitButtonLocator.click();
    await page.waitForLoadState('networkidle');
    await expect(addToCartButtonLocator.first()).toBeVisible();
     const productsPage = new ProductsPage(page);
    await productsPage.addAllProductsToCart();
    await cartButtonLocator.click();
    await page.waitForLoadState('networkidle');
    await productsPage.clickCheckOutButton();
    await page.waitForLoadState('networkidle');
    const checkOutProductsPage = new CheckOutProductsPage(page);
    await checkOutProductsPage.selectCountryFromList("India");
    await checkOutProductsPage.compareEmails();
    await checkOutProductsPage.fillPersonalInformationForm("456","AnaAck Ord","rahulshettyacademy");
    await checkOutProductsPage.completeOrderPurchase();
    await page.screenshot({ path: 'pagina.png' });
    });

    test('descargar documento', async ({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const emailLocator =  page.locator("input[id='userEmail']");
    const passwordLocator =  page.locator("input[id='userPassword']");
    const registerHeadTitleLocator =  page.locator("[class='login-title']");
    const submitButtonLocator =  page.locator("//input[@type='submit']");
    const addToCartButtonLocator =  page.locator("//button[contains(text(),'Add To Cart')]")//("//button[contains(text(),'Cart')]/preceding-sibling::label");
    const cartButtonLocator =  page.locator("//button[@routerlink='/dashboard/cart']");

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await expect(page).toHaveTitle("Let's Shop");
    await expect(registerHeadTitleLocator).toHaveText("Log in");
    await emailLocator.fill('anaack26@gmail.com.com');
    await passwordLocator.fill('AnaAck@2');
    await submitButtonLocator.click();
    await page.waitForLoadState('networkidle');
    await expect(addToCartButtonLocator.first()).toBeVisible();
    
    const productsPage = new ProductsPage(page);
    await productsPage.addAllProductsToCart();
    await cartButtonLocator.click();
    await page.waitForLoadState('networkidle');
    await productsPage.clickCheckOutButton();
    await page.waitForLoadState('networkidle');
    
    const checkOutProductsPage = new CheckOutProductsPage(page);
    await checkOutProductsPage.selectCountryFromList("India");
    await checkOutProductsPage.compareEmails();
    await checkOutProductsPage.fillPersonalInformationForm("456","AnaAck Ord","rahulshettyacademy");
    await checkOutProductsPage.completeOrderPurchase();
    await page.waitForLoadState('networkidle');
    
    const [download] = await Promise.all([
    page.waitForEvent('download'), // empieza a "escuchar" el evento
    page.locator("//button[normalize-space()='Click To Download Order Details in CSV']").click(), // dispara la descarga
    ]);
    expect(download.suggestedFilename()).toBe('order-invoice_anaack26.csv');
    });

    test('Check product order in order page', async ({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const emailLocator =  page.locator("input[id='userEmail']");
    const passwordLocator =  page.locator("input[id='userPassword']");
    const registerHeadTitleLocator =  page.locator("[class='login-title']");
    const submitButtonLocator =  page.locator("//input[@type='submit']");
   
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await expect(page).toHaveTitle("Let's Shop");
    await expect(registerHeadTitleLocator).toHaveText("Log in");
    await emailLocator.fill('anaack26@gmail.com.com');
    await passwordLocator.fill('AnaAck@2');
    await submitButtonLocator.click();
    await page.waitForLoadState('networkidle');

    const OrdersPage = new MyOrdersPage(page);
    await OrdersPage.checkPorducIdIsPresented();
    await page.screenshot({ path: 'pagina.png' });
     });

    test('Ejercicios', async ({browser}) =>{
        const context = await browser.newContext();
        const page = await context.newPage();
        const twosums = new Ejercicios(page);
        await twosums.evenOrOdd(-2);
        
    });

    //button[contains(text(),'Add To Cart')]