export class OrderHistoryPage {
  constructor(page) {
    this.page = page;

    this.orderHistoryConfirmation = page.locator("h1", {
      hasText: "Thankyou for the order.",
    });

    this.orderHistoryBtn = page.locator("label[routerlink*='myorders']");

    this.orderHistoryTable = page.locator("tbody");
    this.orderHistoryRows = page.locator("tbody tr");

    this.orderHistoryId = page.locator("label.ng-star-inserted");
  }

  async orderHistoryLink() {
    await this.orderHistoryBtn.click();
  }

  async getOrderId() {
    return await this.orderHistoryId.first().textContent();
  }

  async getOrderHistoryId(orderId) {
    const rowCount = await this.orderHistoryRows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = this.orderHistoryRows.nth(i);
      const rowOrderId = (await row.locator("th").textContent()).trim();

      if (orderId.includes(rowOrderId)) {
        await this.orderHistoryRows.nth(i).locator("button").first().click();
        break;
      }
    }
  }
}
