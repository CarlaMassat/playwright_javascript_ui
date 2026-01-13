export class OrderReviewPage {
  constructor(page) {
    this.page = page;

    this.orderReviewProductName = page.locator("div.item__title");

    this.orderReviewPaymentMethod = page
      .locator("div.payment__type")
      .filter({ hasText: "Credit Card" });

    this.orderReviewCVV = page
      .locator("div.field.small", { hasText: "CVV Code" })
      .locator("input");

    this.orderReviewName = page
      .locator("div.field", { hasText: "Name on Card " })
      .locator("input");

    this.orderReviewCartCoupon = page
      .locator("div.field.small", { hasText: "Apply Coupon " })
      .locator("input");

    this.orderReviewCartCouponButton = page.getByRole("button", {
      name: "Apply Coupon",
    });

    this.orderReviewCartCouponApplied = page.locator("p", {
      hasText: "* Coupon Applied",
    });

    this.orderReviewCardNumber = page
      .locator("div.field", {
        has: page.locator("div.title", { hasText: "Credit Card Number" }),
      })
      .locator("input");

    this.orderReviewEmail = page.locator("div.user__name input[type='text']");
    this.orderReviewCountry = page.getByPlaceholder("Select Country");
    this.orderReviewCountryDropdown = page.locator(".ta-results");

    this.orderReviewCartPlaceHolderButton = page.getByText("Place Order");
  }

  async getProductName() {
    return await this.orderReviewProductName.textContent();
  }
  async getPaymentMethod() {
    return await this.orderReviewPaymentMethod.textContent();
  }

  async getCVV(cvv) {
    await this.orderReviewCVV.fill(cvv);
  }

  async getName(name) {
    await this.orderReviewName.fill(name);
  }

  async getAndApplyCoupon(coupon) {
    await this.orderReviewCartCoupon.fill(coupon);
    await this.orderReviewCartCouponButton.click();
    return this.orderReviewCartCouponApplied;
  }

  async getCreditCardNumber(cardNumber) {
    await this.orderReviewCardNumber.fill(cardNumber);
  }

  async getEmail() {
    return await this.orderReviewEmail.inputValue();
  }

  async getCountryAndSelect(countryName) {
    await this.orderReviewCountry.pressSequentially(countryName, {
      delay: 100,
    });

    await this.orderReviewCountryDropdown
      .locator(`button.ta-item:has-text("${countryName}")`)
      .click();
  }

  async getSelectedCountry() {
    return await this.orderReviewCountry.inputValue();
  }

  async clickPlaceHolder() {
    await this.orderReviewCartPlaceHolderButton.click();
  }
}
