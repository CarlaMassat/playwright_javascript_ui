const { test, expect } = require("@playwright/test");

test("Browser Context Playwright", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://google.com");
});


test("First Playwright", async ({ page }) => {
  await page.goto(" https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator('[name="password"]').fill("learning");
  await page.locator("#signInBtn").click();
  console.log(await page.locator("[style*='block']").textContent());
});


test("Browser Context-Validating Error login", async ({ page }) => { 
  await page.goto(" https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await page.locator("#username").fill("rahulshetty");
  await page.locator('[name="password"]').fill("learning");
  await page.locator("#signInBtn").click();
  await expect(page.locator("[style*='block']")).toContainText(
    "Incorrect username/password."
  );
});

test("Browser Context-Validating login", async ({ page }) => {
    const userName = page.locator('#username');
    const cardTitles = page.locator('.card-body a');

  await page.goto(" https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill('rahulshettyacademy');
  await page.locator('[name="password"]').fill("learning");
  await page.locator("#signInBtn").click();
  await expect(page.locator('[value*="Signing"]')).toContainText('Signing ..')
  
  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent());

  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles)
});

test("Practise website register", async ({page}) => {
  const registerLink = page.locator('.text-reset');
  const firstName = page.locator('#firstName');
  const lastName = page.locator('#lastName');
  const email = page.locator('#userEmail');
  const phoneNumber = page.locator('#userMobile');
  const password= page.locator('#userPassword');
  const confirmPassword = page.locator('#confirmPassword');
  const confirmCheckbox = page.locator('input[type="checkbox"]');
  
  const registerBtn = page.locator('input[value="Register"]');
  const accountRegistered = page.locator('.headcolor');
  
  
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  
  await registerLink.click();
  
  await firstName.fill('Lucia'); 
  await lastName.fill('Sacraf');
  await email.fill('cm92mdp@hotmail.com');
  await phoneNumber.fill('1234567891');
  await password.fill('Ac123456789?');
  await confirmPassword.fill('Ac123456789?');
  await confirmCheckbox.check();
  await registerBtn.click();

  await expect (accountRegistered).toContainText('Account Created Successfully');
  
});


test("Practise website already register email ", async ({page}) => {
  const registerLink = page.locator('.text-reset');
  const firstName = page.locator('#firstName');
  const lastName = page.locator('#lastName');
  const email = page.locator('#userEmail');
  const phoneNumber = page.locator('#userMobile');
  const password= page.locator('#userPassword');
  const confirmPassword = page.locator('#confirmPassword');
  const confirmCheckbox = page.locator('input[type="checkbox"]');

  const registerBtn = page.locator('input[value="Register"]');


   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  
    await registerLink.click();
    await firstName.fill('lucia'); 
    await lastName.fill('sacraf');
    await email.fill('cm90mdp@gmail.com');
    await phoneNumber.fill('1234567892');
    await password.fill('Ac123456789?');
    await confirmPassword.fill('Ac123456789?');
    await confirmCheckbox.check();
    await registerBtn.click();

     await expect(page.getByText('User already exisits with this Email Id!')).toBeVisible();


});

test("Practise website blank required fields ", async ({page}) => {

  const registerLink = page.locator('.text-reset');
  const registerBtn = page.locator('input[value="Register"]');
    
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  
  await registerLink.click();
  await registerBtn.click();
  
  await expect(page.getByText('*First Name is required')).toBeVisible();
  await expect(page.getByText('*Email is required')).toBeVisible();
  await expect(page.getByText('*Phone Number is required')).toBeVisible();
  await expect(page.getByText('*Password is required')).toBeVisible();
  await expect(page.getByText('Confirm Password is required')).toBeVisible();
  await expect(page.getByText('*Please check above checkbox')).toBeVisible();

});

test("Practise website login", async ({page}) => {
  const loginLink = page.locator('#login');
  const email = page.locator('#userEmail');
  const password= page.locator('#userPassword');
 
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await email.fill('cm90mdp@gmail.com');
  await password.fill('Aa123456789?');
  await loginLink.click();
  await page.locator('.card-body h5').first().waitFor();
  const cardTitles = await page.locator('.card-body h5').allTextContents();
  console.log(cardTitles)
  
});


test("UI Controls", async ({page}) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const userName = page.locator('#username');
  const signIn = page.locator('#signIn');
  const blinkText = page.locator('.blinkingText');
  const dropDown = page.locator('select.form-control');
  const radioButton = page.locator('.checkmark');
  const checkBox = page.locator('#terms');
  const okBtn = page.locator('#okayBtn')
  
 
  await dropDown.selectOption('consult');
  await radioButton.last().click();
  await okBtn.click();
  await checkBox.click();
  await checkBox.uncheck();


  
  await expect(radioButton.last()).toBeChecked();
  await expect (blinkText).toHaveAttribute('class','blinkingText');
  expect( await checkBox.isChecked()).toBeFalsy();

});

test("Child Windows handl", async ({browser}) => {
  
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const blinkText = page.locator('.blinkingText');
 
  const [newPage] = await Promise.all(
 [
   context.waitForEvent('page'),
   blinkText.click(),
 ]);

   const text = await newPage.locator('.red').textContent();
   console.log(text)
});