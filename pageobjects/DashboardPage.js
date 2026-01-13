export class DashBoardPage {
  constructor(page) {
    this.page = page;

    this.dashboardProducts = page.locator(".card-body");
    this.dashboardProductsText = page.locator(".card-body h5");
    this.dashboardProductCart = page.locator(".btn.btn-custom", {
      hasText: "Cart",
    });
  }

  async searchProduct(productName) {
    await this.dashboardProducts.first().waitFor({ state: "visible" });

    const cardTitles = await this.dashboardProductsText.allTextContents();
    console.log(cardTitles);
    const count = await this.dashboardProducts.count();

    for (let i = 0; i < count; i++) {
      if (
        (
          await this.dashboardProducts.nth(i).locator("b").textContent()
        )?.trim() === productName
      ) {
        await this.dashboardProducts
          .nth(i)
          .locator('button:has-text("Add to Cart")')
          .click();

        await this.page
          .locator("#toast-container", {
            hasText: "Product Added To Cart",
          })
          .waitFor({ state: "visible" });

        break;
      }
    }
  }

  async navigateToCart() {
    await this.dashboardProductCart.click();
  }
}
