import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const {
  POSTGRES_USER: user,
  POSTGRES_PASSWORD: password,
  POSTGRES_HOST: host,
  POSTGRES_PORT: port,
  POSTGRES_DB: database,
  DATABASE_URL,
} = process.env;

// Se você já tiver uma DATABASE_URL, use-a; senão monta a partir das outras vars:
const url =
  DATABASE_URL ??
  `postgresql://${user}:${password}@${host}:${port}/${database}`;

export default defineConfig({
  out:    './drizzle',
  schema: './src/db/schema/index.ts',   // ou o seu “entry point” de schemas
  dialect:'postgresql',
  dbCredentials: {
    url,    // <-- aqui
  },
});