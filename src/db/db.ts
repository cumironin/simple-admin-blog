// import { drizzle } from 'drizzle-orm/node-postgres';
// import { Client } from 'pg';
// import * as dotenv from 'dotenv';
// dotenv.config();

// const client = new Client({
// 	connectionString: process.env.DATABASE_URL
// });

// await client.connect();
// export const db = drizzle(client);

import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

import * as schema from './schema';

const client = new Client({
	connectionString: process.env.DATABASE_URL
});

client.connect();
export const db = drizzle(client, { schema: schema });
