import { expect, test } from '@playwright/test';
import { LoginEventPage } from '../../pages/Event Booking/loginEventPage';
import { DashboardSwitchUserPage } from '../../pages/Switch User Page/dashboardSwitchUserPage';


test.only('Correct signin to Hide Elements Page', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage(); 
    const NavigateToHide = new DashboardSwitchUserPage(page);
    await NavigateToHide.navigateToAtuoamtionPracticeAndNavigateBack();
    await page.screenshot({ path: 'pagina.png' });
} );