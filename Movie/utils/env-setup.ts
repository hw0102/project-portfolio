function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

const DB_ID = requireEnv(
  process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  "EXPO_PUBLIC_APPWRITE_DB_ID",
);
const PROJECT_ID = requireEnv(
  process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  "EXPO_PUBLIC_APPWRITE_PROJECT_ID",
);
const ENDPOINT = requireEnv(
  process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  "EXPO_PUBLIC_APPWRITE_ENDPOINT",
);
const TABLE_ID = requireEnv(
  process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID,
  "EXPO_PUBLIC_APPWRITE_TABLE_ID",
);

export { DB_ID, PROJECT_ID, ENDPOINT, TABLE_ID };
