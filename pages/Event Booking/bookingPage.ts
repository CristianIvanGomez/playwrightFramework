import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class BookSeatsPage {
    readonly page: Page;
    readonly bookTicketsFrom: Locator;
    readonly addTicketsButton: Locator;
    readonly removeTicketsButton: Locator;
    readonly fullNameInputLocator: Locator;
    readonly emailInputLocator: Locator;
    readonly phoneInputLocator: Locator;
    readonly totalLabelLocator: Locator;
    readonly confirmBookingButtonLocator: Locator;
    readonly generalReferenceBookingLocator: Locator;
    readonly referenceBookingLocator: Locator;
    readonly nameEventLocator: Locator;
    readonly viewMyBookingsButtonLocator: Locator;

    constructor(page: Page) {
    this.page = page;
    this.bookTicketsFrom = page.locator("div[class='grid grid-cols-1 lg:grid-cols-3 gap-8'] div[class*='lg:sticky']"); 
    this.addTicketsButton = page.getByRole('button', { name: '+' }); 
    this.removeTicketsButton = page.getByRole('button', { name: '-' }); 
    this.fullNameInputLocator = page.getByPlaceholder("Your full name"); 
    this.emailInputLocator = page.getByPlaceholder("you@email.com"); 
    this.phoneInputLocator = page.getByPlaceholder("+91 98765 43210"); 
    this.totalLabelLocator = page.locator("div[class*='bg-indigo-50'] div[class*='flex justify-between'] span"); 
    this.confirmBookingButtonLocator = page.getByRole('button', { name: 'Confirm booking' }); 
    this.generalReferenceBookingLocator = page.locator("div[class*='bg-indigo-50 border']"); 
    this.referenceBookingLocator = page.locator("span[class*='booking-ref']");
    this.nameEventLocator = page.locator("h1[class*='text-2xl sm:text']");
    this.viewMyBookingsButtonLocator = page.getByRole('button', { name: 'View my bookings' }); 
  }

  async fillMandatoryFieldsToBook(): Promise<void> {
    await expect(this.bookTicketsFrom).toBeVisible();
    await this.fullNameInputLocator.fill("Anita Ackerman");
    await this.emailInputLocator.fill("anita.ackerman@example.com");
    await this.phoneInputLocator.fill("+91 98765 43210");
    await this.addTicketsButton.click();
    await expect(this.totalLabelLocator.last()).toHaveText("$600");
  }

  async confirmBooking(): Promise<void> {
    await this.confirmBookingButtonLocator.click();
    await expect(this.page.locator("h3[class*='text-xl']")).toBeVisible();
    await expect(this.page.locator("h3[class*='text-xl']")).toContainText("Booking Confirmed!");
  }

  async validateReferenceBooking(): Promise<{ referenceText: string; nameEvent: string }> {
    const referenceText = await this.generalReferenceBookingLocator.locator(this.referenceBookingLocator).textContent() ?? '';
    const nameEvent = await this.nameEventLocator.textContent() ?? '';
    await expect(this.generalReferenceBookingLocator.locator(this.referenceBookingLocator)).toContainText(referenceText);
    console.log("Name Text on Booking Page: " + nameEvent);
    return { referenceText, nameEvent };
  }

  async goToViewMyBookings(): Promise<void> {
    await this.viewMyBookingsButtonLocator.click();
    await expect(this.page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
  }
}