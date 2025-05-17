import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(process.cwd(), `.env`),
});

export default () => ({
  db: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || '5432',
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});
