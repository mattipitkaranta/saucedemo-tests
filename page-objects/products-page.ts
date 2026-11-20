import type { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private readonly page: Page) {}

  get heading() {
    return this.page.getByTestId('title').filter({ hasText: /^Products$/ });
  }

  get prices() {
    return this.page.getByTestId('inventory-list').getByTestId('inventory-item-price');
  }

  get detailName() {
    return this.page.getByTestId('inventory-item-name');
  }

  get detailPrice() {
    return this.page.getByTestId('inventory-item-price');
  }

  private product(name: string) {
    return this.page.getByTestId('inventory-item').filter({
      has: this.page.getByText(name, { exact: true }),
    });
  }

  priceOf(name: string) {
    return this.product(name).getByTestId('inventory-item-price');
  }

  async addToCart(name: string) {
    await this.product(name).getByRole('button', { name: 'Add to cart', exact: true }).click();
  }

  async sortByLowestPrice() {
    await this.page.getByTestId('product-sort-container').selectOption({ label: 'Price (low to high)' });
  }

  async openDetails(name: string) {
    await this.product(name).getByText(name, { exact: true }).click();
    await this.page.getByRole('button', { name: 'Back to products', exact: true }).waitFor();
  }
}
