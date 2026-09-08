import { test as base } from '@playwright/test';
import { LoginEventPage } from '../pages/Event Booking/loginEventPage';

type PageFixtures = {
  loginPage: LoginEventPage;
 
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    console.log("loginPage fixture is being used");
    await use(new LoginEventPage(page));
  },
});

export { expect } from '@playwright/test';