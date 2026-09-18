import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class CheckOutProductsPage {
    readonly page: Page;
    readonly cvvCodeInputLocator: Locator;
    readonly nameOnCardInputLocator: Locator;
    readonly applyCouponInputLocator: Locator;
    readonly selectCountryLocator: Locator;
    readonly countryListLocator: Locator;
    readonly listItemLocator: Locator;
    readonly emailLabelLocator: Locator;
    readonly nameOnCardLocator: Locator;
    readonly applyCoupon: Locator;
    readonly applyCouponButtonLocator: Locator;
    readonly applyCouponConfirmationLocator: Locator;
    readonly placeOrderButtonLocator: Locator;
    readonly negativeToastMessageLocator: Locator;
    readonly positiveToastMessageLocator: Locator;
    readonly orderDetailsParentGrid: Locator;
    readonly orderDetailstGrid: Locator;
    readonly orderSummaryGrid: Locator;
    readonly orderInfoGrid: Locator;

    constructor(Cartpage: Page) {
    this.page = Cartpage;
    this.cvvCodeInputLocator = Cartpage.locator("//div[@class='title' and contains(normalize-space(text()), 'CVV Code')]/following-sibling::input"); 
    this.nameOnCardInputLocator = Cartpage.locator("//div[@class='title' and contains(normalize-space(text()), 'Name on Card')]/following-sibling::input");
    this.applyCouponInputLocator = Cartpage.locator("//div[@class='title' and contains(normalize-space(text()), 'Apply Coupon')]/following-sibling::input"); 
    this.selectCountryLocator = Cartpage.getByPlaceholder("Select Country");
    this.countryListLocator = Cartpage.locator("//section[@class='ta-results list-group ng-star-inserted']"); 
    this.listItemLocator = Cartpage.locator("//button[contains(@class, 'list-group-item')]"); 
    this.emailLabelLocator = Cartpage.locator(".user__name [type='text']")
    this.nameOnCardLocator = Cartpage.locator("//div[@class='title' and contains(normalize-space(text()), 'Name on Card')]/following-sibling::input")
    this.applyCoupon = Cartpage.locator("//div[@class='title' and contains(normalize-space(text()), 'Apply Coupon')]/following-sibling::input")
    this.applyCouponButtonLocator = Cartpage.locator("//button[@class='btn btn-primary mt-1' and contains(normalize-space(text()), 'Apply Coupon')]")
    this.placeOrderButtonLocator = Cartpage.getByText("PLACE ORDER");
    this.applyCouponConfirmationLocator = Cartpage.locator("//p[@class='mt-1 ng-star-inserted']");
    this.negativeToastMessageLocator = Cartpage.locator("//div[@class='ng-tns-c4-34 toast-title ng-star-inserted']");
    this.positiveToastMessageLocator = Cartpage.locator("//div[contains(@class, 'toast-success')]");
    this.orderDetailsParentGrid = Cartpage.locator("//table[contains(@class, 'content')]")
    this.orderDetailstGrid = Cartpage.locator("//table[@align='center']//table");
    this.orderSummaryGrid = Cartpage.locator("//table[@class='order-summary']")
    this.orderInfoGrid = Cartpage.locator("//table[@class='info-cta']")
  }

  async selectCountryFromList(countryName: string): Promise<void> {
    await expect(this.selectCountryLocator).toBeVisible();
    await this.selectCountryLocator.pressSequentially(countryName);
    await expect(this.countryListLocator).toBeVisible();
    await this.page.getByRole("button",{name: "India"}).nth(1).click();
    // const totalCountryOptions = await this.listItemLocator.count();
    // for (let i = 0; i < totalCountryOptions; i++) {
    //   const textContent = await this.listItemLocator.locator("//span[@class='ng-star-inserted']").nth(i).textContent();
    //     if (textContent?.trim() === countryName) {
    //         await this.listItemLocator.nth(i).click();
    //         break; // Exit the loop after clicking the desired country
    //     }   
    // }
  }

  async compareEmails(): Promise<void> {
    const emailTextField = await this.emailLabelLocator.last().inputValue();
    await expect(this.emailLabelLocator.first()).toHaveText(emailTextField);
  }

  async fillPersonalInformationForm(CVVCode: string, NameOnCard: string, ApplyCoupon:string): Promise<void>{
    await this.cvvCodeInputLocator.pressSequentially(CVVCode);
    await this.nameOnCardInputLocator.pressSequentially(NameOnCard);
    await this.applyCoupon.pressSequentially(ApplyCoupon);
    await this.applyCouponButtonLocator.click();
    await expect(this.applyCouponConfirmationLocator).toBeVisible();
    await expect(this.applyCouponConfirmationLocator).toContainText("* Coupon Applied");
  }

  async completeOrderPurchase(): Promise<void>{
    await expect(this.placeOrderButtonLocator).toBeVisible();
    this.placeOrderButtonLocator.click();
    const orderDetailsPattern = /\/api\/ecom\/order\/get-orders-details\?id=/;
    const idsCapturados: string[] = [];
    this.page.on('response', (response) => {
    if (orderDetailsPattern.test(response.url()) && response.status() === 200) {
      const url = new URL(response.url());
      const id = url.searchParams.get('id');
      console.log("ids capturado: "+id)
    if (id) idsCapturados.push(id);
    }
  });
    await expect.poll(() => idsCapturados.length).toBe(3);
    await expect(this.positiveToastMessageLocator).toBeVisible();
    await expect(this.positiveToastMessageLocator).toContainText(" Order Placed Successfully ");
    const girdDetails=await this.orderDetailsParentGrid.locator(this.orderDetailstGrid);
    await expect(girdDetails).toContainText("Thankyou for the order.");
    const listOfUIIds: string[] = await girdDetails.locator("//td/label[@class='ng-star-inserted']").allTextContents();
    const cleanUIdIds: string[] = listOfUIIds.map(id => id.replace(/\|/g, '').trim());
    const cleanAPIIds: string[] = idsCapturados.map(id => id.replace(/\|/g, ''));
    expect(cleanAPIIds.sort()).toEqual(cleanUIdIds.sort());
  }

  async reviewOrderDetails(): Promise<void>{
    await this.page.waitForLoadState('networkidle');
    await expect(this.orderDetailsParentGrid).toBeVisible();
    await expect(this.orderDetailsParentGrid.locator(this.orderDetailstGrid)).toContainText("Thankyou for the order.");
  }

  async compareOrderIds(): Promise<void>{
    await this.page.waitForLoadState('networkidle');
    await expect(this.orderDetailsParentGrid).toBeVisible();
    
  }

}