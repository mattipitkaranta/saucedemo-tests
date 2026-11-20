# Project instructions

- Use `*.spec.ts` files under `tests/`. Group related scenarios by business feature and name each spec for its feature, such as `checkout.spec.ts`. Use feature subdirectories when a feature needs several specs.
- Name tests after business outcomes and express steps in domain terms. Keep expected outcomes visible in the specs.
- Use lightweight page objects in `page-objects/` for page-specific locators and meaningful actions. Reuse existing page objects, fixtures, and helpers before adding new ones. Add abstractions only when they make the tests easier to read or maintain.
- Prefer scoped locators by role and accessible name or by label. Use Sauce Demo's stable `data-test` attributes when semantic locators are unsuitable. Avoid brittle selectors tied to DOM structure or incidental ordering.
- Use Playwright's auto-waiting and web-first assertions such as `await expect(locator).toBeVisible()`. Wait for observable outcomes. Never use fixed sleeps.
- Keep tests independent. Each test owns its setup and uses a fresh browser context, with no dependency on execution order, shared mutable state, or another test's results.
- Never change an expected result just to make a test pass. Investigate failures and confirm intended behavior before updating expectations.
- Verify changes with a TypeScript check and run the affected tests in Chromium. Run the full suite when shared fixtures, page objects, or configuration change. Report any checks you could not run.

## Test credentials

- Never hardcode real credentials, commit secrets, or expose credential values in logs, error messages, or shared test artifacts.
- Use semantic account aliases in scenarios and page-object calls. Resolve environment-specific usernames, client IDs, and passwords through the centralized test user configuration in `config/test-users.ts`. Report missing configuration using variable names only.
- Use an ignored local `.env` file for development and inject credentials through the CI/CD secret store. Preserve values already provided by the environment.
- Keep `.env.example` limited to variable names and safe placeholders. Keep Playwright authentication state and generated test artifacts out of version control.
