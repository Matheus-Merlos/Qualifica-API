import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const env = process.env.ENV!;

const host = env === 'prod' ? process.env.POSTGRES_HOST! : 'localhost';
const port = env === 'prod' ? 5432 : parseInt(process.env.POSTGRES_PORT!);

const {
  POSTGRES_USER: user,
  POSTGRES_PASSWORD: password,
  POSTGRES_DB: database,
  DATABASE_URL,
} = process.env;

// Se você já tiver uma DATABASE_URL, use-a; senão monta a partir das outras vars:
const url =
  DATABASE_URL ??
  `postgresql://${user}:${password}@${host}:${port}/${database}`;

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url, // <-- aqui
  },
});
