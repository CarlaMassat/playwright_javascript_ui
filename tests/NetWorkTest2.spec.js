const { test, expect, request } = require("@playwright/test");

test("Security test request intercept", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill("cm90mdp@gmail.com");
  await page.locator("#userPassword").fill("Aa123456789?");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page.locator("button[routerlink*='myorders']").click();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6",
      })
  );
  await page.getByRole("button", { name: "View" }).first().click();
  await expect(page.locator("p").last()).toHaveText(
    "You are not authorize to view this order"
  );

  await page.pause();
});
