export class LoginPage {
  // declarar los locators en el constructor
  constructor(page) {
    this.page = page;
    this.signInUserEmail = page.locator("#userEmail");
    this.signInPassword = page.locator("#userPassword");
    this.signInbutton = page.locator("#login");
  }

  // metodos que usan esos locators

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }

  async validLogin(email, password) {
    await this.signInUserEmail.fill(email);
    await this.signInPassword.fill(password);
    await this.signInbutton.click();
    // await this.page.waitForLoadState("networkidle");
    await this.page;
  }
}
