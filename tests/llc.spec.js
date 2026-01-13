const { test, expect } = require("@playwright/test");

test("Playwright Special locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click(); // seleccionar el checkbox, puedo usar check()
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");

  await page.getByPlaceholder("Password").fill("abc123"); // para usar getByPlaceholder tiene que tener atributo placeholder
  await page.getByRole("button", { name: "Submit" }).click();
  await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();
  await page.getByRole("link", { name: "Shop" }).click();
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click(); // chaining
  // locator('app-card') --> busca dentro de los 4 elementos y filtra para obtener Nokia Edge
  // hace click en el boton de ese elemento especifico
});
