import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class EventsPage {
    readonly page: Page;
    readonly headerLocator: Locator;
    readonly eventCardLocator: Locator;
    readonly bookingButtonLocator: Locator;
    readonly seatsCounterAvailableLocator: Locator;

    constructor(page: Page) {
    this.page = page;
    this.headerLocator = page.getByText("Upcoming Events");//("//button[contains(text(),'Add To Cart')]"); // tu selector real
    this.eventCardLocator = page.locator("[data-testid='event-card']"); // tu selector real
    this.seatsCounterAvailableLocator = page.locator("span[class*='font-semibold text-emerald-600']"); // tu selector real
    this.bookingButtonLocator = page.locator("[data-testid='book-now-btn']"); // tu selector real
  }

   async validateEventsPage(): Promise<void> {
    await this.page.goto('https://eventhub.rahulshettyacademy.com/');
    await expect(this.page).toHaveTitle("EventHub — Discover & Book Events");
    await expect(this.headerLocator).toBeVisible();
    await this.eventCardLocator.filter({hasText:"AnitaAckEvent1"})
  }

  async validateEventCard(): Promise<void> {
    await expect(this.eventCardLocator.locator('h3').filter({hasText:"AnitaAckEvent1"})).toBeVisible({timeout: 5000});
  }

  async seatsBeforeBooking(): Promise<number> {
    const seatsBeforeReduction = await this.seatsCounterAvailableLocator.textContent() ?? '';
    console.log("Seats available before booking: " + seatsBeforeReduction);
    return parseInt(seatsBeforeReduction || '0');
//const seatsText = await this.eventCardLocator.filter({hasText:"AnitaAckEvent1"}).locator('span').filter({hasText:/ seats available:/}).textContent();
  }

  async seatsAfterBooking(seatsBeforeReduction: number): Promise<void> {
    const seatsAfterReduction = await this.seatsCounterAvailableLocator.textContent() ?? '';
    await expect(seatsBeforeReduction).toBeGreaterThan(parseInt(seatsAfterReduction || '0'));
    console.log("Seats available before booking: " + seatsBeforeReduction + "Seats available after booking: " + seatsAfterReduction);
  }

  async bookNow(eventName: string): Promise<void> {
    await this.eventCardLocator.filter({hasText:eventName}).locator(this.bookingButtonLocator).click();
  }

}