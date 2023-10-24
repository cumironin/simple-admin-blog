import { lucia } from 'lucia';
import { pg } from '@lucia-auth/adapter-postgresql';
import { sveltekit } from 'lucia/middleware';
import { Pool } from 'pg';
import { dev } from '$app/environment';

import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

export const auth = lucia({
	adapter: pg(pool, {
		user: 'auth_user',
		key: 'user_key',
		session: 'user_session'
	}),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});

export type Auth = typeof auth;
