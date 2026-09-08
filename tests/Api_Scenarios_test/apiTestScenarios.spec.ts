import { test, expect } from '../../fixtures/pageFixtures';
import { request } from '@playwright/test';
import APIUtils from '../../utils/utilsClasesAPI/APIUtils';
import fs from 'fs';

//llamo los payloads de los archivos json
const loginPayload = JSON.parse(fs.readFileSync('utils/apiJsonFiles/loginPayload.json', 'utf-8'));
const orderPayload = JSON.parse(fs.readFileSync('utils/apiJsonFiles/ordersPayload.json', 'utf-8'));

//creo un objeto de tipo response para almacenar el token y el orderId
let response: { orderId?: any; token?: any; };
//creo el contexto request para la API y creo el objeto de la clase APIUtils que envia como parametros el contexto y el payload de login, luego llamo al metodo createOrder que devuelve un objeto con el token y el orderId
test.beforeAll('Login', async ({ }) => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test.only('Create order API and validate in UI', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);  
    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor({ state: 'visible' });

    const rows = page.locator('tbody tr');
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        
        if (rowOrderId !== null && response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator('.col-text').textContent();
    await page.pause();
    expect(orderIdDetails?.includes(response.orderId)).toBe(true);
    await page.screenshot({ path: 'pagina.png' });
} );

// verify if order created is present in the history page
// precodnition: create order -