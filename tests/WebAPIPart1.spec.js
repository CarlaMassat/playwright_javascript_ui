const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("../utils/ApiUtils");

const loginPayLoad = {
  userEmail: "cm90mdp@gmail.com",
  userPassword: "Aa123456789?",
};

const orderPayload = {
  orders: [
    { country: "Argentina", productOrderedId: "68a961459320a140fe1ca57a" },
  ],
};

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
    { token: response.token },
  );

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.reload();
  await page.waitForLoadState("networkidle");
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();

    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
