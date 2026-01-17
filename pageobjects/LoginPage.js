export class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInUserEmail = page.locator("#userEmail");
    this.signInPassword = page.locator("#userPassword");
    this.signInbutton = page.locator("#login");
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }

  async validLogin(email, password) {
    await this.signInUserEmail.fill(email);
    await this.signInPassword.fill(password);
    await this.signInbutton.click();
    await this.page;
  }
}
