import pg from "pg";
import process from "node:process";
import { config } from "dotenv";

config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
