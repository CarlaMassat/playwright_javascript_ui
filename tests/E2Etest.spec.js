const { test, expect } = require("@playwright/test");

test("E2E Automation Practise", async ({ page }) => {
  const loginLink = page.locator("#login");
  const email = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const products = page.locator(".card-body");
  const product = "ZARA COAT 3";
  const itemCart = page.getByRole("heading", { name: "ZARA COAT 3" });
  const cartButton = page.locator(".btn.btn-custom", { hasText: "Cart" });
  const cartQuantity = page.locator(".item__quantity", { hasText: "Quantity" });
 
  const cartProduct = page.locator("h3:has-text('ZARA COAT 3')");
  const cartCheckout = page.locator(".btn.btn-primary", {hasText: "Checkout"});

  const cartAllPayments = page.locator("div.payment__type");
  const cartCreditPayment = cartAllPayments.filter({hasText: "Credit Card"});
  const cartCVV = page.locator('div.field.small', {hasText: "CVV Code"}).locator('input');
  const cartCoupon = page.locator('div.field.small', {hasText: "Apply Coupon "}).locator('input');
  const cartName = page.locator('div.field', {hasText: "Name on Card "}).locator('input');
  const cartCouponButton = page.getByRole('button',{name:'Apply Coupon'});
  const cartCouponApplied = page.locator('p.mt-1.ng-star-inserted', {name:'* Coupon Applied'});
  const cartCountry = page.getByPlaceholder('Select Country');
  const cartCountryDropdown = page.locator('.ta-results');
  const cartButtonSubmit = page.getByText('Place Order');


  const order = page.getByText("Thankyou for the order.")
  const orderId = page.locator('td.em-spacer-1 label').filter({hasText: '| '});
  const orderHistory = page.getByText("Orders History Page");
  const orderTableId = page.locator("tbody th[scope='row']"); // localiza todas las filas con ordeId de tabla


  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await email.fill("cm90mdp@gmail.com");
  await password.fill("Aa123456789?");
  await loginLink.click();
  await page.locator(".card-body h5").first().waitFor();
  const cardTitles = await page.locator(".card-body h5").allTextContents(); // va desde el parent(.card-body) hasta el child(h5)
  console.log(cardTitles);

  const count = await products.count();


  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === product) {
      await products.nth(i).locator('button:has-text("Add to Cart")').click();
    }
  }


  await expect(itemCart).toBeVisible();
  await expect(cartButton).toHaveText("Cart 1");
  await cartButton.click();


  await cartProduct.waitFor({state: 'visible'})
  const cartVisible = await cartProduct.isVisible();
  expect(cartVisible).toBeTruthy();
  
  await cartCheckout.click();
  await expect(cartQuantity).toHaveText(/1/);
  await expect(cartCreditPayment).toBeVisible();
  await cartCVV.fill('123');
  await cartName.fill('CARLA');
  await cartCoupon.fill('rahulshettyacademy');
  await cartCouponButton.click();
  await expect(cartCouponApplied).toBeVisible();
  await cartCountry.pressSequentially('arg');
  await expect(cartCountryDropdown).toBeVisible();
  await page.getByRole('button', {name: 'Argentina'}).click();
  await cartButtonSubmit.click();
  await expect (order).toBeVisible();
  await expect (orderId).toBeVisible();
  const orderIdPrev = (await orderId.textContent()).replace(/\|/g, '').trim();
  await expect(orderHistory).toBeVisible();
  await orderHistory.click();

  const countOrderId = await orderTableId.count();

 
  for (let i= 0; i < countOrderId; i++) {
    const currentId = await orderTableId.nth(i).textContent();
    
   
    if (currentId === orderIdPrev) {
      console.log(`Id: ${orderIdPrev}`)
    }
    
  }
});