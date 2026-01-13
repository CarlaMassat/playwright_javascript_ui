export class CartPage {
  constructor(page) {
    this.page = page;

    this.cartProducts = page.locator("h3");
    this.cartProductPrice = page.locator(".prodTotal.cartSection p").last();
    this.cartProductCheckout = page.locator(".btn.btn-primary", {
      hasText: "Checkout",
    });
  }

  getProductByName(productName) {
    return this.cartProducts.filter({ hasText: productName });
  }

  async cartCheckout() {
    await this.cartProductCheckout.click();
  }
}
