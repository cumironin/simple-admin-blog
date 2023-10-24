import { db } from '../../../../../db/db';
import { userTable } from '../../../../../db/schema';
import { sql, eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, url, locals, cookies }) => {
	const user = await db.select().from(userTable).where(eq(userTable.id, params.usersId));
	const userEdit = user[0];

	return { userEdit };
};

export const actions = {
	default: async ({ request, params, url }) => {
		console.log(url.pathname.match);

		const formData = await request.formData();

		const users = {
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			username: formData.get('username') as string,
			password: formData.get('password') as string
		};

		// const id = crypto.randomUUID();
		const passwordHash = await bcrypt.hash(users.password, 10);
		await db
			.update(userTable)
			.set({
				name: users.name,
				email: users.email,
				username: users.username
				// password: passwordHash
			})
			.where(eq(userTable.id, params.usersId));

		throw redirect(302, '/users');
	}
};
