import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { DateHelper } from '../../helpers/getDateInTheFuture';


export class NewEventPage {
    readonly page: Page;
    readonly headerLocator: Locator;
    readonly titleLocator: Locator;
    readonly descriptionLocator: Locator;
    readonly categoryLocator: Locator;
    readonly cityLocator: Locator;
    readonly venueLocator: Locator;
    readonly eventDateLocator: Locator;
    readonly priceLocator: Locator;
    readonly totalSeatsLocator: Locator;
    readonly imageUrlLocator: Locator;
    readonly addEventButtonLocator: Locator;
    readonly succesToastMessageLocator: Locator;

    constructor(page: Page) {
    this.page = page;
    this.headerLocator = page.locator("//h2[contains(text(),'+ New Event')]");
    this.titleLocator = page.getByPlaceholder("Event title");//("//button[contains(text(),'Add To Cart')]"); // tu selector real
    this.descriptionLocator = page.getByPlaceholder("Describe the event…");//("//button[contains(text(),'Add To Cart')]"); // tu selector real
    this.categoryLocator = page.getByRole("combobox", {name:'Category'})//locator("//button[contains(text(),'Add To Cart')]"); // tu selector real
    this.cityLocator = page.getByPlaceholder("e.g. Bangalore");//("//button[contains(text(),'Add To Cart')]"); // tu selector real
    this.venueLocator = page.getByPlaceholder("Venue name & address");//("//button[contains(text(),'Add To Cart')]"); // tu selector real
    this.eventDateLocator = page.locator("input[id='event-date-&-time']");//("//button[contains(text(),'Add To Cart')]"); // tu selector real
    this.priceLocator = page.getByPlaceholder("0.00");//("//button[contains(text(),'Add To Cart')]"); // tu selector real
    this.totalSeatsLocator = page.getByPlaceholder("e.g. 500");//("//button[contains(text(),'Add To Cart')]"); // tu selector real
    this.imageUrlLocator = page.getByPlaceholder("https://…");//("//button[contains(text(),'Add To Cart')]"); // tu selector real
    this.addEventButtonLocator = page.getByRole("button", { name: "+ Add Event" }); // tu selector real
    this.succesToastMessageLocator = page.locator("//div[contains(@class,'pointer-events-auto')]"); // tu selector real
  }

   async createNewEvent(): Promise<void> {
    await expect(this.headerLocator).toBeVisible();
    await this.titleLocator.fill("AnitaAckEvent1");
    await this.descriptionLocator.fill("This is a new Event for Ana & her friends");
    await this.categoryLocator.selectOption("Festival");
    await this.cityLocator.fill("Guadalajara");
    await this.venueLocator.fill("AnitaStreet 123");
    const isoDate = DateHelper.getFutureDateTime(3, 10, 47, true);
    await this.eventDateLocator.fill(isoDate);//getFutureDateTime(3, 10, 47, true));
    await expect(this.eventDateLocator).toHaveValue('2026-08-07T22:47');
    await this.priceLocator.fill("700");
    await this.totalSeatsLocator.fill("500");
    await this.imageUrlLocator.fill("https://example.com/image.jpg");
    await this.addEventButtonLocator.click();
    await this.succesToastMessageLocator.waitFor({ state: 'visible' });
    await expect(this.succesToastMessageLocator).toBeVisible();
    await expect(this.succesToastMessageLocator.locator("//p[contains(@class,'leading-snug')]")).toHaveText("Event created!");
  }
}