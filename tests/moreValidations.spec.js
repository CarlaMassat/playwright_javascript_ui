const { test, expect } = require("@playwright/test");

test("Popup validations", async ({ page }) => {
  // await page.goto("https://google.com");
  // await page.goBack();
  // await page.goForward();

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  await page.pause();

  page.locator("dialog", (dialog) => dialog.accept()); // click en OK
  //page.locator("dialog", (dialog) => dialog.dismiss()); // click en Cancel
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();
  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage
    .locator("a[href*='all-access-subscription']:visible")
    .first()
    .click();
});
