class ApiUtils {
  // El constructor recibe 2 parametros:
  // apiContext:contexto de Playwright para hacer requests
  // loginPayLoad: email + contraseña para login

  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }

  // Metodo para obtener token del login
  // Hace el POST al endpoint de login con los datos del usuario
  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayLoad, // Body del request
      }
    );
    // ok --> 200
    // valida que la respuesta sea verdadera

    // Convierte la respuesta del servidor a JSON
    const loginResponseJson = await loginResponse.json();
    // Extrae el token JWT que devuelve la API
    const token = loginResponseJson.token;
    console.log(token);

    // Devuelve el token para usarlo en otros métodos
    return token;
  }

  // Metodo para crear la orden usando token
  async createOrder(orderPayload) {
    let response = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: response.token, // Token para autenticar la request
          "Content-Type": "application/json",
        },
      }
    );

    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    // Guarda el ID de la orden creada (orders es un array)
    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;

    // Devuelve { token, orderId }
    return response;
  }
}

module.exports = { ApiUtils };
