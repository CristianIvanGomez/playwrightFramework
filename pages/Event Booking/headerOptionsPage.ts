import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class HeaderOptions {
    readonly page: Page;
    readonly adminButtonLocator: Locator;
    readonly adminOptionListLocator: Locator;
    readonly eventsLocator: Locator;
    readonly myBookingsLocator: Locator;

    constructor(page: Page) {
    this.page = page;
    this.adminButtonLocator = page.getByRole("button", {name:'Admin'})//locator("//button[contains(text(),'Add To Cart')]"); // tu selector real
    this.adminOptionListLocator = page.getByRole("link", {name:'Manage Events'}).nth(0); // tu selector real
    this.eventsLocator = page.locator('[data-testid="nav-events"]'); // tu selector real
    this.myBookingsLocator = page.getByRole("link", {name:'My Bookings'}).nth(0);
  }

   async navigateToManageEvents(): Promise<void> {
    await this.adminButtonLocator.click();
    await this.adminOptionListLocator.waitFor({ state: 'visible' });
    await expect(this.adminOptionListLocator).toBeVisible();
    await expect(this.adminOptionListLocator).toHaveText("Manage Events");
    await this.adminOptionListLocator.click();
  }

  async navigateToEvents(): Promise<void> {
    await this.eventsLocator.click();
  }

  async navigateToMyBookings(): Promise<void> {
    await this.myBookingsLocator.click();
    await expect(this.page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
  }

}