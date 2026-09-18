import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class MyBookingsPage {
    readonly page: Page;
    readonly bookingCardsLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bookingCardsLocator = page.locator("[data-testid='booking-card']"); 
    }

    async validateMyBookingTickets(referenceText: string, nameEvent: string): Promise<void> {
        await this.bookingCardsLocator.first().waitFor({ state: 'visible' });
        await expect(this.bookingCardsLocator.first()).toBeVisible();
        console.log("Reference Text on My Bookings Page: " + referenceText);
        await expect(this.bookingCardsLocator.first().locator(".booking-ref")).toContainText(referenceText);
        await expect(this.bookingCardsLocator.first().locator("h3")).toContainText(nameEvent);
        await expect(this.bookingCardsLocator.last()).toBeVisible();    
    }

}