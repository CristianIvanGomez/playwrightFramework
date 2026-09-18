import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class CartProductsPage {
  readonly page: Page;
  readonly cartProductsLocator: Locator;
  readonly buyNowProductsLocator: Locator;
  readonly deleteProductsLocator: Locator;
  readonly totalProductsLocator: Locator;

  constructor(Cartpage: Page) {
    this.page = Cartpage;
    this.cartProductsLocator = Cartpage.locator("//ul[contains(@class, 'cartWrap')]/li"); 
    this.buyNowProductsLocator = Cartpage.locator("//button[contains(text(), 'Buy Now')]"); 
    this.deleteProductsLocator = Cartpage.locator("//button[contains(@class, 'btn-danger')]"); 
    this.totalProductsLocator = Cartpage.locator("//div[contains(@class, 'prodTotal')]");
  }

  async counterAllProducts(): Promise<void> {
    const total = await this.cartProductsLocator.count();
    console.log("Total products in the cart: " + total);
  }

  async getAllProductsTotal(): Promise<void> {
    const total = await this.cartProductsLocator.count();
      console.log("Product total: " + total);
  }

  async deleteAllProducts(): Promise<void> {
    const total = await this.deleteProductsLocator.count();
    for (let i = 0; i < total; i++) {
      await this.deleteProductsLocator.nth(i).click();
    }
  }

  async buyNowProduct(productIndex: number): Promise<void> {
    await expect(this.buyNowProductsLocator.nth(productIndex)).toBeVisible();
    await expect(this.page.getByText("ZARA COAT 3")).toBeVisible();
    await expect(this.page.getByRole("button",{name:"Checkout"})).toBeVisible();
    const total = await this.buyNowProductsLocator.count();
    for (let i = 0; i < total; i++) {
      productIndex = productIndex - 1; // Adjust for zero-based index
      if (i === productIndex) {
        await this.buyNowProductsLocator.nth(i).click();
        break; // Exit the loop after clicking the desired product
      }
    }
  }

}