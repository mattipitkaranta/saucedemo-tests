import { expect, test } from '@playwright/test';
import { CartPage } from '../page-objects/cart-page';
import { CheckoutPage } from '../page-objects/checkout-page';
import { LoginPage } from '../page-objects/login-page';
import { ProductsPage } from '../page-objects/products-page';

const backpack = 'Sauce Labs Backpack';
const bikeLight = 'Sauce Labs Bike Light';

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

test('A shopper can place an order at the correct total', async ({ page }) => {
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  await new LoginPage(page).signIn('standardUser');

  // The approved plan specifies a $29.99 unit price and $2.40 tax for this order.
  const quantity = 1;
  const unitPriceCents = 2999;
  const taxCents = 240;
  const subtotalCents = unitPriceCents * quantity;
  const totalCents = subtotalCents + taxCents;

  await expect(products.priceOf(backpack)).toHaveText(usd.format(unitPriceCents / 100));
  await products.addToCart(backpack);
  await cart.open();
  await cart.checkout();
  await checkout.enterName('Test', 'Shopper');
  await checkout.enterPostalCode('00100');
  await checkout.continueToOverview();

  await expect(checkout.overviewHeading).toBeVisible();
  await expect(checkout.itemNames).toHaveText([backpack]);
  await expect(checkout.itemQuantities).toHaveText([String(quantity)]);
  await expect(checkout.subtotal).toHaveText(`Item total: ${usd.format(subtotalCents / 100)}`);
  await expect(checkout.tax).toHaveText(`Tax: ${usd.format(taxCents / 100)}`);
  await expect(checkout.total).toHaveText(`Total: ${usd.format(totalCents / 100)}`);

  await checkout.finishOrder();
  await expect(checkout.confirmation).toHaveText('Thank you for your order!');
  await checkout.backToProducts();
  await expect(products.heading).toBeVisible();
  await cart.open();
  await expect(cart.items).toHaveCount(0);
  await expect(cart.badge).toBeHidden();
});

test('A locked account cannot sign in', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);

  await login.signIn('lockedUser');

  await expect(login.error).toBeVisible();
  await expect(login.error).toContainText('Sorry, this user has been locked out.');
  await expect(login.loginButton).toBeVisible();
  await expect(products.heading).toBeHidden();
});

test('Checkout requires a postal code before showing the order overview', async ({ page }) => {
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  await new LoginPage(page).signIn('standardUser');
  await products.addToCart(backpack);
  await cart.open();
  await cart.checkout();

  await checkout.enterName('Test', 'Shopper');
  await checkout.continueToOverview();
  await expect(checkout.error).toBeVisible();
  await expect(checkout.error).toContainText('Postal Code is required');
  await expect(checkout.informationHeading).toBeVisible();

  await checkout.enterPostalCode('00100');
  await checkout.continueToOverview();
  await expect(checkout.overviewHeading).toBeVisible();
  await expect(checkout.itemNames).toHaveText([backpack]);
});

test('Removing an item keeps cart contents and badge in sync', async ({ page }) => {
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  await new LoginPage(page).signIn('standardUser');

  await products.addToCart(backpack);
  await products.addToCart(bikeLight);
  await cart.open();
  await expect(cart.items).toHaveCount(2);
  await expect(cart.quantityOf(backpack)).toHaveText('1');
  await expect(cart.quantityOf(bikeLight)).toHaveText('1');
  await expect(cart.badge).toHaveText('2');

  await cart.remove(bikeLight);
  await expect(cart.itemNames).toHaveText([backpack]);
  await expect(cart.badge).toHaveText('1');

  await cart.continueShopping();
  await expect(products.heading).toBeVisible();
  await cart.open();
  await expect(cart.itemNames).toHaveText([backpack]);
  await expect(cart.quantityOf(backpack)).toHaveText('1');
  await expect(cart.badge).toHaveText('1');
});

test('A shopper can sort by price and open the matching product details', async ({ page }) => {
  const products = new ProductsPage(page);
  await new LoginPage(page).signIn('standardUser');
  await expect(products.prices.nth(1)).toBeVisible();
  const ascendingPrices = (await products.prices.allTextContents()).sort(
    (first, second) => Number(first.replace('$', '')) - Number(second.replace('$', '')),
  );

  await products.sortByLowestPrice();
  await expect(products.prices).toHaveText(ascendingPrices);
  const catalogBackpackPrice = await products.priceOf(backpack).innerText();

  await products.openDetails(backpack);
  await expect(products.detailName).toHaveText(backpack);
  await expect(products.detailPrice).toHaveText(catalogBackpackPrice);
});
