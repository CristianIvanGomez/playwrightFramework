import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class MyOrdersPage {
 readonly page: Page;
  readonly yourOrdersTableLocator: Locator;
  readonly yourOrdersTableHeaderLocator: Locator;
  readonly yourOrdersTableBodyLocator: Locator;
  readonly loadingPage: Locator;
  

  constructor(Cartpage: Page) {
    this.page = Cartpage;
    this.yourOrdersTableLocator = Cartpage.locator("//table[contains(@class, 'table table-bordered table-hover ng-star-inserted')]"); // tu selector real
    this.yourOrdersTableHeaderLocator = Cartpage.locator("//thead[contains(@class, 'thead-dark')]"); // tu selector real
    this.yourOrdersTableBodyLocator = Cartpage.locator("//tbody//tr[@class='ng-star-inserted']"); // tu selector real
    this.loadingPage = Cartpage.locator("//div[@class='mt-4 ng-star-inserted' and contains(normalize-space(text()), 'Loading....')]"); // tu selector real
  }

   async checkPorducIdIsPresented(): Promise<void> {
    const ordersButtonLocator =  this.page.locator("//button[@routerlink='/dashboard/myorders']");
    await expect(ordersButtonLocator).toBeVisible();
    await ordersButtonLocator.click()
    await this.page.waitForLoadState('networkidle');
    const loader = await this.page.locator("//div[contains(text(),'Loading')]");
    await loader.waitFor({ state: 'hidden', timeout: 15000 });
    await this.yourOrdersTableLocator.waitFor({ state: 'visible' });

    const idsLenght= await this.yourOrdersTableLocator.locator(this.yourOrdersTableBodyLocator).count();

    for(let i = 0; i<idsLenght; i++){
        const idFromTable= this.yourOrdersTableBodyLocator.locator("//th").nth(i)
        const idText = (await idFromTable.textContent())?.trim();
        if(idText === "6a624c7285b8849b490804ed"){
        console.log('El id esta en la posicion: ' + i);
        break;
        }
    }
   
  }



}