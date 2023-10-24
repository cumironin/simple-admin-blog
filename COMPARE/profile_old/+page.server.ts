// import { z } from 'zod';
// import { db } from '../../../db/db.js';
// import { userTable } from '../../../db/schema.js';
// import bcrypt from 'bcrypt';
// import { fail } from '@sveltejs/kit';
// import { sql, eq, inArray } from 'drizzle-orm';

// export const load = async ({ request, params, locals, url }) => {
// 	const usersSelect = await db
// 		.select({
// 			id: userTable.id,
// 			fullname: userTable.fullName,
// 			username: sql`lower(${userTable.username})`,
// 			email: userTable.email
// 		})
// 		.from(userTable);

// 	// const id = url.searchParams.get('usersId');

// 	// const usersDelete = await db.select().from(userTable).where(eq(userTable.id));

// 	return { usersSelect };
// };

// const registerSchema = z.object({
// 	name: z
// 		.string({ required_error: 'Full Name is required' })
// 		.min(8, { message: 'Full Name is required less than 8 characters' })
// 		.max(64, { message: 'Full Name must be less than 64 characters' })
// 		.trim(),
// 	email: z
// 		.string({ required_error: 'Email is required' })
// 		.min(20, { message: 'must be less than 20 characters' })
// 		.trim(),
// 	username: z
// 		.string({ required_error: 'Username is required' })
// 		.min(5, { message: 'Full Name is required less than 5 characters' })
// 		.max(64, { message: 'Username must be less than 64 characters' })
// 		.trim(),
// 	password: z
// 		.string({ required_error: 'Password is required' })
// 		.min(10, { message: 'Password must be at least 10 characters' })
// 		.trim()
// });

// export const actions = {
// 	saveUsers: async ({ request }) => {
// 		const formData = await request.formData();

// 		const users = {
// 			name: formData.get('name') as string,
// 			email: formData.get('email') as string,
// 			username: formData.get('username') as string,
// 			password: formData.get('password') as string
// 		};

// 		const id = crypto.randomUUID();

// 		const safeParse = registerSchema.safeParse(users);

// 		if (!safeParse.success) {
// 			const data = {
// 				data: Object.fromEntries(formData),
// 				errors: safeParse.error.flatten().fieldErrors
// 			};
// 			return fail(400, data);
// 		}

// 		const passwordHash = await bcrypt.hash(users.password, 10);
// 		await db.insert(userTable).values({
// 			id,
// 			fullName: users.name,
// 			email: users.email,
// 			username: users.username,
// 			password: passwordHash
// 		});
// 	},
// 	deleteUsers: async ({ url }) => {
// 		const id = url.searchParams.get('id');
// 		const urlId = String(id);
// 		await db.delete(userTable).where(eq(userTable.id, urlId)).returning();
// 	},
// 	pickDeleteUsers: async ({ url }) => {
// 		const id = url.searchParams.get('id');
// 		const splitId = id?.split(',');
// 		await db.delete(userTable).where(inArray(userTable.id, splitId)).returning();
// 	}
// };
