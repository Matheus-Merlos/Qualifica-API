import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: `./src/db/schema`,
  dialect: 'postgresql',
  dbCredentials: {
    user: process.env.POSTGRES_USER!,
    host: process.env.POSTGRES_HOST!,
    database: process.env.POSTGRES_DB!,
    password: process.env.POSTGRES_PASSWORD!,
    port: parseInt(process.env.POSTGRES_PORT!),
    ssl: false,
  },
});
