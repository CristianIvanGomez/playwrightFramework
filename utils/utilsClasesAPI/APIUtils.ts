import { expect } from '../../fixtures/pageFixtures';

class APIUtils {
    //crea un objeto de tipo response para almacenar el token y el orderId
    apiContext: any;
    loginPayload: any;

    //crea el constructor de la clase APIUtils que recibe como parametros el contexto de la API y el payload de login
    constructor(apiContext: any, loginPayload: any = {}) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    //crea el metodo getToken que recibe como parametro el payload de login y devuelve el token de la respuesta de la API
    async getToken(loginPayload: any = {}) {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: loginPayload,
        });
        expect(loginResponse.ok()).toBeTruthy();
        const loginData = await loginResponse.json();
        const token = loginData.token;
        console.log('Token received: ' + loginData.token);
        return token;
    }
    //crea el metodo createOrder que recibe como parametro el payload de orden y devuelve un objeto con el token y el orderId
    async createOrder(orderPayload: any) {
        let response: { orderId?: any; token?: any } = { };
        response.token = await this.getToken(this.loginPayload);
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayload, 
                headers:{
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                        }
                })
                const orderOrderResponseJSON = await orderResponse.json();
                console.log("Order response: " + JSON.stringify(orderOrderResponseJSON));   
                const orderId = orderOrderResponseJSON.orders[0];
                response.orderId = orderId;
                return response;
    }
}

export default APIUtils;
