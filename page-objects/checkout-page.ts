import type { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  get informationHeading() {
    return this.page.getByTestId('title').filter({ hasText: /^Checkout: Your Information$/ });
  }

  get overviewHeading() {
    return this.page.getByTestId('title').filter({ hasText: /^Checkout: Overview$/ });
  }

  get error() {
    return this.page.getByTestId('error');
  }

  get itemNames() {
    return this.page.getByTestId('inventory-item-name');
  }

  get itemQuantities() {
    return this.page.getByTestId('item-quantity');
  }

  get subtotal() {
    return this.page.getByTestId('subtotal-label');
  }

  get tax() {
    return this.page.getByTestId('tax-label');
  }

  get total() {
    return this.page.getByTestId('total-label');
  }

  get confirmation() {
    return this.page.getByTestId('complete-header');
  }

  async enterName(firstName: string, lastName: string) {
    await this.page.getByTestId('firstName').fill(firstName);
    await this.page.getByTestId('lastName').fill(lastName);
  }

  async enterPostalCode(postalCode: string) {
    await this.page.getByTestId('postalCode').fill(postalCode);
  }

  async continueToOverview() {
    await this.page.getByRole('button', { name: 'Continue', exact: true }).click();
  }

  async finishOrder() {
    await this.page.getByRole('button', { name: 'Finish', exact: true }).click();
  }

  async backToProducts() {
    await this.page.getByRole('button', { name: 'Back Home', exact: true }).click();
  }
}
