const credentialVariables = {
  standardUser: {
    username: 'TEST_USERNAME',
    password: 'TEST_PASSWORD',
  },
  lockedUser: {
    username: 'TEST_LOCKED_USERNAME',
    password: 'TEST_LOCKED_PASSWORD',
  },
} as const;

export type TestUser = keyof typeof credentialVariables;

export function getTestCredentials(user: TestUser) {
  const variables = credentialVariables[user];
  const username = process.env[variables.username];
  const password = process.env[variables.password];

  if (!username?.trim()) {
    throw new Error(`Missing required environment variable ${variables.username}.`);
  }
  if (!password?.trim()) {
    throw new Error(`Missing required environment variable ${variables.password}.`);
  }

  return { username, password };
}
