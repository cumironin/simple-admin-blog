import { asc, eq, inArray } from 'drizzle-orm';
import { db } from '../../../db/db';
import { menuTable, roleTable, userTable, userToRoleTable } from '../../../db/schema';
import type { integer } from 'drizzle-orm/pg-core';
import { fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

export const load = async ({ url }) => {
	// console.log(url);

	const userAll = await db
		.select({
			id: userTable.id,
			name: userTable.name,
			username: userTable.username,
			email: userTable.email
		})
		.from(userTable)
		.orderBy(asc(userTable.numsort));

	const roleAll = await db
		.select({
			id: roleTable.id,
			name: roleTable.roleName
		})
		.from(roleTable);
	// const roleId = role[0];

	return { userAll, roleAll };
};

export const actions = {
	saveMenu: async ({ request, params }) => {
		const { username, password, name, email } = Object.fromEntries(
			await request.formData()
		) as Record<string, string>;

		try {
			await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: username.toLowerCase(),
					password
				},
				attributes: {
					username,
					name,
					email
				}
			});
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Could not register user' });
		}
		// throw redirect(302, '/login');

		// const formData = await request.formData();
		// const user = {
		// 	username: formData.get('username') as string,
		// 	name: formData.get('name') as string,
		// 	email: formData.get('email') as string,
		// 	role: formData.get('role') as string,
		// 	roleid: formData.get('roleid') as string
		// };
		// await db
		// 	.update(userTable)
		// 	.set({
		// 		username: user.username,
		// 		name: user.name,
		// 		email: user.email
		// 	})
		// 	.where(eq(menuTable.id, params.userId));
		// insert user table
		// const id = crypto.randomUUID();
		// await db.insert(userTable).values({
		// 	id,
		// 	username: user.username,
		// 	name: user.name,
		// 	email: user.email
		// });
		// insert role_user table
		// const iduserrole = crypto.randomUUID();
		// await db.insert(userToRoleTable).values({
		// 	id: iduserrole,
		// 	roleId: user.roleid,
		// 	userId: id
		// });
	},
	delMenu: async ({ url }) => {
		const id = url.searchParams.get('id') as string;

		await db.delete(menuTable).where(eq(menuTable.id, id)).returning();
	}
};
