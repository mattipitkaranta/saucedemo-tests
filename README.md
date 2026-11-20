# SauceDemo Playwright tests

## 1. Set up Node.js

Open a terminal in the project folder. Install Node.js **22.16.0**, the version pinned in `.node-version`. If you already use `nvm`, run:

```sh
nvm install 22.16.0
nvm use 22.16.0
```

Run `node --version` and check that it prints `v22.16.0`.

## 2. Install dependencies and Chromium

```sh
npm ci
npm run install:chromium
```

On Linux, if Chromium's system dependencies are missing, run `npm run install:chromium -- --with-deps`. Installing system packages may require administrator privileges.

## 3. Configure the test accounts

Copy the template to the local `.env` file.

```sh
cp .env.example .env
```

Replace all four placeholders in `.env`. The SauceDemo login page lists the standard and locked accounts and their shared password. [SauceDemo](https://www.saucedemo.com/)

| Required variable | Value |
| --- | --- |
| `TEST_USERNAME` | Standard demo account username |
| `TEST_PASSWORD` | Published demo password |
| `TEST_LOCKED_USERNAME` | Locked demo account username |
| `TEST_LOCKED_PASSWORD` | Same published demo password |

## 4. Run the tests

From the project folder, run all five tests in Chromium.

```sh
npm test -- --project=chromium
```

## CI/CD

Use the same Node.js version and install and test commands. Supply all four variables through your CI/CD secret store. The runner's environment variables take precedence over values in a local `.env` file.

Keep `.env`, authentication state, and generated test artifacts out of version control. When running with real credentials, keep Playwright API debug logs and tracing disabled because they can capture sign-in values.
