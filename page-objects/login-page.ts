import type { Page } from '@playwright/test';
import { getTestCredentials, type TestUser } from '../config/test-users';

export class LoginPage {
  constructor(private readonly page: Page) {}

  get loginButton() {
    return this.page.getByRole('button', { name: 'Login', exact: true });
  }

  get error() {
    return this.page.getByTestId('error');
  }

  async signIn(user: TestUser) {
    const { username, password } = getTestCredentials(user);
    await this.page.goto('/');
    try {
      await this.page.getByTestId('username').fill(username);
      await this.page.getByTestId('password').fill(password);
    } catch {
      // Playwright's fill error can include the supplied credential.
      throw new Error('Could not fill the SauceDemo login fields.');
    }
    await this.loginButton.click();
  }
}
