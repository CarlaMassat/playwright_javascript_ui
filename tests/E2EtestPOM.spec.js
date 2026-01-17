const { test, expect } = require("@playwright/test");
import { LoginPage } from "../pageobjects/LoginPage";
import { DashBoardPage } from "../pageobjects/DashboardPage";
import { CartPage } from "../pageobjects/CartPage";
import { OrderReviewPage } from "../pageobjects/OrderReviewPage";
import { OrderHistoryPage } from "../pageobjects/OrderHistoryPage";

test("E2E Automation Practise", async ({ page }) => {
  const userEmail = "cm90mdp@gmail.com";
  const userPassword = "Aa123456789?";
  const productName = "ZARA COAT 3";
  const expectedProduct = "ZARA COAT 3";
  const expectedTotalPrice = "$ 11500";
  const country = "Argentina";
  const cardNumber = "1234 5678 9999 0000";
  const cvv = "123";
  const name = "CARLA";
  const coupon = "rahulshettyacademy";
  const couponApplied = "* Coupon Applied";

  const loginPage = new LoginPage(page);
  const dashbordPage = new DashBoardPage(page);
  const cartPage = new CartPage(page);
  const orderPage = new OrderReviewPage(page);
  const orderHistoryPage = new OrderHistoryPage(page);

  await loginPage.goto();
  await loginPage.validLogin(userEmail, userPassword);

  await dashbordPage.searchProduct(productName);

  await dashbordPage.navigateToCart();

  const cartProduct = cartPage.getProductByName(expectedProduct);

  await expect(cartProduct).toBeVisible();

  await expect(cartPage.cartProductPrice).toHaveText(expectedTotalPrice);

  await cartPage.cartCheckout();

  const emailOrder = await orderPage.getEmail();
  expect(emailOrder).toBe(userEmail);

  const orderProduct = await orderPage.getProductName();
  expect(orderProduct.trim()).toBe(expectedProduct);

  const payment = await orderPage.getPaymentMethod();
  expect(payment).toContain("Credit Card");

  await orderPage.getCreditCardNumber(cardNumber);
  await orderPage.getCVV(cvv);
  await orderPage.getName(name);

  const appliedCoupon = await orderPage.getAndApplyCoupon(coupon);
  await expect(appliedCoupon).toHaveText(couponApplied);

  await orderPage.getCountryAndSelect(country);

  const selectedCountry = await orderPage.getSelectedCountry();
  expect(selectedCountry).toBe(country);

  await orderPage.clickPlaceHolder();

  const orderId = await orderHistoryPage.getOrderId();
  expect(orderId).toBeTruthy();
  expect(orderId).toContain("| ");

  await orderHistoryPage.orderHistoryLink();
  await orderHistoryPage.getOrderHistoryId(orderId);
});
