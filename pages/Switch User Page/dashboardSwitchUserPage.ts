import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class DashboardSwitchUserPage {

    readonly page: Page;
    readonly checkMeOutLoveIceCreamCheckBox: Locator;
    readonly studenRadioCheck: Locator;

    constructor(Cartpage: Page) {
        this.page = Cartpage;
        this.checkMeOutLoveIceCreamCheckBox = Cartpage.getByLabel("Check me out if you Love IceCreams!"); 
        this.studenRadioCheck = Cartpage.getByLabel("Student");
    }

     async navigateToAtuoamtionPracticeAndNavigateBack(): Promise <void>{
        
        await this.page.goto('https://google.com');
        await this.page.goBack();
        await this.page.goto('https://rahulshettyacademy.com/AutomationPractice/');
        await this.page.goForward();
        await this.page.locator('#displayed-text').scrollIntoViewIfNeeded();
        await expect(this.page.locator('#displayed-text')).toBeVisible();
        await this.page.locator('#hide-textbox').click();
        await expect(this.page.locator('#displayed-text')).toBeHidden();
        
        //this.page.on('dialog', dialog => dialog.accept());
        await this.page.locator('#confirmbtn').click();
        
        this.page.on('dialog', async dialog => {
        console.log(dialog.message()); // opcional, para ver el texto del alert
        await dialog.accept(); // simula click en "OK"
  
         });
        await this.page.locator('#mousehover').hover();
        
        const coursesFrame = await this.page.frameLocator('#courses-iframe');
        await coursesFrame.locator("li a[href='lifetime-access']:visible").click();
        //await this.page.pause();
        //coursesFrame.locator("//h1[contains(text(), 'LEARNING PATHS')]").waitFor({ state: 'visible' });
        const text =await coursesFrame.locator("//h2[contains(text(), 'Join ')]").textContent();
        text?.split(" ").forEach(word => {
            console.log(word);
        });
       
        //await expect(coursesFrame.locator("//h1[contains(text(), 'LEARNING PATHS')]")).toBeVisible();
        //await this.page.pause();
    }
}