import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly addToCartButtonLocator: Locator;
  readonly addToCartToastMessageLocator: Locator;
  readonly checkOutLocator: Locator;
  readonly cardProductLocator: Locator;
  readonly getAddToCartButtonsCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtonLocator = page.locator("//button[contains(text(),'Add To Cart')]"); 
    this.addToCartToastMessageLocator = page.locator("//*[@id='toast-container']//div[contains(text(),' Product Added To Cart')]"); 
    this.checkOutLocator = page.getByRole("button", {name:"checkout"});
    this.cardProductLocator = page.locator(".card-body")
    this.getAddToCartButtonsCount = page.getByRole("listitem").getByRole('button', {name:"Cart"})
  }

  async addAllProductsToCart(): Promise<void> {
    await this.cardProductLocator.filter({hasText:"ZARA COAT 3"}).locator(this.addToCartButtonLocator).click();
    await this.addToCartToastMessageLocator.waitFor({ state: 'hidden' });
    await this.cardProductLocator.filter({hasText:"IPHONE 13 PRO"}).locator(this.addToCartButtonLocator).click();
    await this.addToCartToastMessageLocator.waitFor({ state: 'hidden' });
    await this.cardProductLocator.filter({hasText:"ADIDAS ORIGINAL"}).locator(this.addToCartButtonLocator).click();
    await this.addToCartToastMessageLocator.waitFor({ state: 'hidden' });

     const getAddToCartCount = await this.getAddToCartButtonsCount.textContent() ?? '';
        console.log("Total 'Add To Cart' buttons found: " + getAddToCartCount);
    //const total = await this.addToCartButtonLocator.count();
    // for (let i = 0; i < total; i++) {
    //   await this.addToCartButtonLocator.nth(i).click();
    //   await expect(this.addToCartToastMessageLocator).toBeVisible();
    //   await this.addToCartToastMessageLocator.waitFor({ state: 'hidden' });
    // }
  }

  async clickMyCarttButton(): Promise<void> {
    await this.getAddToCartButtonsCount.click();
  }

  async clickCheckOutButton(): Promise<void> {
     await this.checkOutLocator.click();
  }
}