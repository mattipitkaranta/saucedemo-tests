import type { Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  get heading() {
    return this.page.getByTestId('title').filter({ hasText: /^Your Cart$/ });
  }

  get badge() {
    return this.page.getByTestId('shopping-cart-badge');
  }

  get items() {
    return this.page.getByTestId('inventory-item');
  }

  get itemNames() {
    return this.items.getByTestId('inventory-item-name');
  }

  private item(name: string) {
    return this.items.filter({ has: this.page.getByText(name, { exact: true }) });
  }

  quantityOf(name: string) {
    return this.item(name).getByTestId('item-quantity');
  }

  async open() {
    await this.page.getByTestId('shopping-cart-link').click();
    await this.heading.waitFor();
  }

  async remove(name: string) {
    await this.item(name).getByRole('button', { name: 'Remove', exact: true }).click();
  }

  async continueShopping() {
    await this.page.getByRole('button', { name: 'Continue Shopping', exact: true }).click();
  }

  async checkout() {
    await this.page.getByRole('button', { name: 'Checkout', exact: true }).click();
  }
}
