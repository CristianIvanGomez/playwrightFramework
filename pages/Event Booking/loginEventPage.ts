import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class LoginEventPage {
    readonly page: Page;
    // readonly emailInputLocator: Locator;
    // readonly passwordInputLocator: Locator;
    // readonly signInButtonLocator: Locator;
    readonly registerHeadTitleLocator: Locator;
    // readonly headerMainPage: Locator;
readonly emailLocator: Locator;
readonly passwordLocator: Locator;
//readonly registerHeadTitleLocator: Locator;
readonly submitButtonLocator: Locator;

    constructor(page: Page) {
    this.page = page;
    // this.emailInputLocator = page.getByPlaceholder("you@email.com");//("//button[contains(text(),'Add To Cart')]"); // tu selector real
    // this.passwordInputLocator = page.getByPlaceholder("••••••");//("//button[contains(text(),'Add To Cart')]"); // tu selector real
    // this.signInButtonLocator = page.getByRole("button", {name:'Sign In'})//locator("//button[contains(text(),'Add To Cart')]"); // tu selector real
    // //this.registerHeadTitleLocator = page.locator("//h1[@class='text-xl font-bold text-gray-900' and contains(text(),'Sign in')]"); // tu selector real
    // this.headerMainPage = page.locator("//h1[contains(text(),'Discover & Book')]"); // tu selector real
    
    this.emailLocator = page.locator("input[id='userEmail']");
    this.passwordLocator = page.locator("input[id='userPassword']");
    this.registerHeadTitleLocator = page.locator("[class='login-title']");
    this.submitButtonLocator = page.locator("//input[@type='submit']");
  }

   async loginToEventPage(): Promise<void> {
    console.log("login Page is being used");
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login')//'https://eventhub.rahulshettyacademy.com/');
    //await expect(this.page).toHaveTitle("EventHub — Discover & Book Events");
    //await expect(this.registerHeadTitleLocator).toHaveText("Sign in to EventHub");
      // await emailLocator.fill('anaack25@gmail.com');
    // await passwordLocator.fill('AnaAck@2');
    // await submitButtonLocator.click();
    await this.emailLocator.fill("anaack25@gmail.com");//"anaack24@gmail.com"
    await this.passwordLocator.fill("AnaAck@2");//"AnaAck@24"
    await this.submitButtonLocator.click();
    await this.page.screenshot({ path: 'pagina.png' }); 
    // await expect(this.headerMainPage).toBeVisible({timeout : 9000});
  }

}