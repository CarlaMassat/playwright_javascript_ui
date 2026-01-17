const { test, expect, request } = require("@playwright/test");

import { ApiUtils } from "../utils/APIUtils";

const loginPayLoad = {
  userEmail: "cm90mdp@gmail.com",
  userPassword: "Aa123456789?",
};

const orderPayload = {
  orders: [
    { country: "Argentina", productOrderedId: "68a961459320a140fe1ca57a" },
  ],
};

const fakePayLoadOders = { data: [], message: "No orders" };

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  const apiUtils = new ApiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayload);
});

test("Place the order ", async ({ page }) => {
  page.addInitScript(
    ({ token }) => {
      window.localStorage.setItem("token", token);
    },
    { token: response.token }
  );

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6876b5c26eb37775309f51cd",
    async (route) => {
      // intercepting response - APi response ->

      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOders);
      route.fulfill({
        response,
        body,
      });
    }
  );

  await page.reload();
  await page.waitForLoadState("networkidle");

  await page.locator("button[routerlink*='myorders']").click();

  page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6876b5c26eb37775309f51cd"
  );
});
