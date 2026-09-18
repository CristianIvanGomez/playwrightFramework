import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class AngularDashboard {

    readonly page: Page;
    readonly checkMeOutLoveIceCreamCheckBox: Locator;
    readonly studenRadioCheck: Locator;
    readonly employedRadioCheck: Locator;
    readonly nameTextInput: Locator;
    readonly emailTextInput: Locator;
    readonly passwordTextInput: Locator;
    readonly genderSelect: Locator;
    readonly dateOfBirthDate: Locator;
    readonly twoWayDataInput: Locator;
    readonly submitButton: Locator;
    readonly successLabelToast: Locator;
    readonly shopLink: Locator;
    readonly nokiaProductCard: Locator;
    readonly checkOutButton: Locator;

    constructor(Cartpage: Page) {
        this.page = Cartpage;
        this.checkMeOutLoveIceCreamCheckBox = Cartpage.getByLabel("Check me out if you Love IceCreams!"); 
        this.studenRadioCheck = Cartpage.getByLabel("Student"); 
        this.employedRadioCheck = Cartpage.getByLabel("Employed"); 
        this.nameTextInput = Cartpage.getByLabel("Name"); 
        this.emailTextInput = Cartpage.locator("//input[@name='email']"); 
        this.passwordTextInput = Cartpage.getByLabel("Password"); 
        this.genderSelect = Cartpage.getByLabel("Employed"); 
        this.dateOfBirthDate = Cartpage.getByLabel("Employed"); 
        this.twoWayDataInput = Cartpage.getByPlaceholder("Employed"); 
        this.submitButton = Cartpage.getByRole("button", {name: "Submit"});
        this.successLabelToast = Cartpage.locator("//div[@class='container']//child::div[@class='alert alert-success alert-dismissible']");
        this.shopLink = Cartpage.getByRole("link", {name : "Shop"});
        this.nokiaProductCard = Cartpage.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button", {name : "Add"});
        this.checkOutButton = Cartpage.locator("//a[@class='nav-link btn btn-primary']");

    }

    async navigateToAngularWebSite(): Promise <void>{
        await this.page.goto('https://rahulshettyacademy.com/angularpractice/');
        await expect(this.page).toHaveTitle("ProtoCommerce");
    }

    async fillMandatoryFields(): Promise <void>{
        await this.checkMeOutLoveIceCreamCheckBox.click();
        await this.employedRadioCheck.check();
        await this.passwordTextInput.fill("Anita")
        await this.emailTextInput.fill("Anita")
        await this.submitButton.click();
    }

    async validateSuccessToastMessage(message: string): Promise <void>{
        await this.successLabelToast.isVisible();
        await expect(this.successLabelToast).toBeVisible({timeout: 10_000});
        await expect(this.successLabelToast).toContainText(message);
    }

    async navigateToShopScreen(): Promise <void>{
        const slowAwaitCustom = expect.configure({timeout : 9000})
        await this.shopLink.click({timeout : 15000});
        await slowAwaitCustom(this.page.locator(".my-4").first()).toHaveText("Shop Name")
    }

    async getSpecificProduct(): Promise <void>{
        await this.nokiaProductCard.isVisible();
        await this.nokiaProductCard.click();
        await expect(this.checkOutButton).toContainText("1");
    }

}