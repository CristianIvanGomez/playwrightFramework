import { expect, test } from '@playwright/test';
import { LoginEventPage } from '../../pages/Event Booking/loginEventPage';
import { HeaderOptions } from '../../pages/Event Booking/headerOptionsPage';
import { NewEventPage } from '../../pages/Event Booking/newEventPage';
import { EventsPage } from '../../pages/Event Booking/eventsPage';
import { BookSeatsPage } from '../../pages/Event Booking/bookingPage';
import { MyBookingsPage } from '../../pages/Event Booking/myBookingsPage';


test('Correct signin to EventHub', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage(); 
    const loginEventPage = new LoginEventPage(page);
    await loginEventPage.loginToEventPage();
    await page.screenshot({ path: 'pagina.png' });
} );

test('Correct signin to EventHubPage', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage(); 
    const loginEventPage = new LoginEventPage(page);
    await loginEventPage.loginToEventPage();
    await page.screenshot({ path: 'pagina.png' });
} );

test('Create a unique event', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage(); 
    const loginEventPage = new LoginEventPage(page);
    await loginEventPage.loginToEventPage();
    await page.screenshot({ path: 'pagina.png' });
    const headerOptions = new HeaderOptions(page);
    await headerOptions.navigateToManageEvents();
    const newEventPage = new NewEventPage(page);
    await newEventPage.createNewEvent();
    await page.screenshot({ path: 'pagina.png' });
} );

test('Find the event card and capture seats', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage(); 
    const loginEventPage = new LoginEventPage(page);
    await loginEventPage.loginToEventPage();
    await page.screenshot({ path: 'pagina.png' });
    const headerOptions = new HeaderOptions(page);
    await headerOptions.navigateToEvents();
    const eventsPage = new EventsPage(page);
    await eventsPage.validateEventsPage();
    await eventsPage.validateEventCard();
    await page.screenshot({ path: 'pagina.png' });
} );

test('Booking for refund', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage(); 
    const loginEventPage = new LoginEventPage(page);
    await loginEventPage.loginToEventPage();
    const headerOptions = new HeaderOptions(page);
    await headerOptions.navigateToEvents();
    const eventsPage = new EventsPage(page);
    await eventsPage.validateEventsPage();
    await eventsPage.bookNow('AnitaAckEvent1');
    const seatsBeforeReduction = await eventsPage.seatsBeforeBooking();
    const bookSeatsPage = new BookSeatsPage(page);
    await bookSeatsPage.fillMandatoryFieldsToBook();
    await bookSeatsPage.confirmBooking();
    const { referenceText, nameEvent } = await bookSeatsPage.validateReferenceBooking();
    await bookSeatsPage.goToViewMyBookings();
    const myBookingsPage = new MyBookingsPage(page);
    await myBookingsPage.validateMyBookingTickets(referenceText, nameEvent);
    await headerOptions.navigateToEvents();
    await eventsPage.seatsAfterBooking(seatsBeforeReduction);
    await page.screenshot({ path: 'pagina.png' });
} );

test('Booking for not refund', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage(); 
    const loginEventPage = new LoginEventPage(page);
    await loginEventPage.loginToEventPage();
    //Navigate to Events Page
   const eventsPage = new EventsPage(page);
    await eventsPage.validateEventsPage();
    await eventsPage.bookNow('FestivalFeaturedDilli Diwali');
    //Booking tickets for festival event
    await page.getByRole('article').filter({ hasText: 'FestivalFeaturedDilli Diwali' }).getByTestId('book-now-btn').click();
     const bookSeatsPage = new BookSeatsPage(page);
    await bookSeatsPage.fillMandatoryFieldsToBook();
    await bookSeatsPage.confirmBooking();
    const { referenceText, nameEvent } = await bookSeatsPage.validateReferenceBooking();
    await expect(page.getByText(referenceText)).toBeVisible();
    //Complete the whole booking process
    await bookSeatsPage.goToViewMyBookings();
    await page.getByRole('button', { name: 'View Details' }).first().click();
    //Navigate to booking details and validate customer details seccion
    await page.getByRole('heading', { name: 'Customer Details' }).isVisible();
    await expect(page.locator("//div[contains(@class,'border-gray-100 shadow-sm p-6')]//h2[contains(text(),'Customer Details')]").locator("//parent::div//span[contains(text(),'Name')]//parent::div")).toHaveText("NameAnita Ackerman");
    await expect(page.locator("//div[contains(@class,'border-gray-100 shadow-sm p-6')]//h2[contains(text(),'Customer Details')]").locator("//parent::div//span[contains(text(),'Email')]//parent::div")).toHaveText("Emailanita.ackerman@example.com");
    await expect(page.locator("//div[contains(@class,'border-gray-100 shadow-sm p-6')]//h2[contains(text(),'Customer Details')]").locator("//parent::div//span[contains(text(),'Phone')]//parent::div")).toHaveText("Phone+91 98765 43210");
//Navigate to booking details and validate Payment summary seccion
    await page.getByRole('heading', { name: 'Payment Summary' }).isVisible();
    await expect(page.locator("//div[contains(@class,'border-gray-100 shadow-sm p-6')]//h2[contains(text(),'Payment Summary')]").locator("//parent::div//span[contains(text(),'Tickets')]//parent::div")).toHaveText("Tickets2");
    await expect(page.locator("//div[contains(@class,'border-gray-100 shadow-sm p-6')]//h2[contains(text(),'Payment Summary')]").locator("//parent::div//span[contains(text(),'Price per ticket')]//parent::div")).toHaveText("Price per ticket$300");
    await expect(page.locator("//div[contains(@class,'border-gray-100 shadow-sm p-6')]//h2[contains(text(),'Payment Summary')]").locator("//parent::div//span[contains(text(),'Total Paid')]//parent::div")).toHaveText("Total Paid$600");
//Navigate to booking details and validate Event details seccion
    await page.getByRole('heading', { name: 'Event Details' }).isVisible();
    await expect(page.locator("//div[contains(@class,'border-gray-100 shadow-sm p-6')]//h2[contains(text(),'Event Details')]").locator("//parent::div//span[contains(text(),'Event')]//parent::div")).toHaveText("EventDilli Diwali Mela");
    await expect(page.locator("//div[contains(@class,'border-gray-100 shadow-sm p-6')]//h2[contains(text(),'Event Details')]").locator("//parent::div//span[contains(text(),'Category')]//parent::div")).toHaveText("CategoryFestival");
    await expect(page.locator("//div[contains(@class,'border-gray-100 shadow-sm p-6')]//h2[contains(text(),'Event Details')]").locator("//parent::div//span[contains(text(),'Date')]//parent::div")).toHaveText("DateTuesday, 20 October 2026");
    await expect(page.locator("//div[contains(@class,'border-gray-100 shadow-sm p-6')]//h2[contains(text(),'Event Details')]").locator("//parent::div//span[contains(text(),'Venue')]//parent::div")).toHaveText("VenuePragati Maidan Exhibition Grounds");
    await expect(page.locator("//div[contains(@class,'border-gray-100 shadow-sm p-6')]//h2[contains(text(),'Event Details')]").locator("//parent::div//span[contains(text(),'City')]//parent::div")).toHaveText("CityDelhi");
    //Navigate to booking details and validate Booking information seccion
    await page.getByRole('heading', { name: 'Booking Information' }).isVisible();
     const bookingDate =  page.locator("//div[contains(@class,'border-gray-100 shadow-sm p-6')]//h2[contains(text(),'Booking Information')]").locator("//parent::div//span[contains(text(),'Booked on')]//parent::div").textContent()?? '';
    await expect(page.locator("//div[contains(@class,'border-gray-100 shadow-sm p-6')]//h2[contains(text(),'Booking Information')]").locator("//parent::div//span[contains(text(),'Booked on')]//parent::div")).toHaveText((await bookingDate) ?? '');
    const bookingID =  page.locator("//div[contains(@class,'border-gray-100 shadow-sm p-6')]//h2[contains(text(),'Booking Information')]").locator("//parent::div//span[contains(text(),'Booking ID')]//parent::div").textContent()?? '';
    await expect(page.locator("//div[contains(@class,'border-gray-100 shadow-sm p-6')]//h2[contains(text(),'Booking Information')]").locator("//parent::div//span[contains(text(),'Booking ID')]//parent::div")).toHaveText((await bookingID) ?? '');
     //Validate refund eligibility for the booking
    await page.getByRole('heading', { name: 'Refund' }).isVisible();
    await expect(page.getByTestId('check-refund-btn')).toContainText('Check eligibility for refund?');
    await page.getByTestId('check-refund-btn').click();
    await page.getByText('Checking your refund').click();
    await page.getByRole('status', { name: 'Loading' }).isVisible();
    await page.getByRole('status', { name: 'Loading' }).waitFor({ state: 'hidden' });
    await expect(page.getByTestId('refund-result')).toContainText('Not eligible for refund. Group bookings (2 tickets) are non-refundable.');
});