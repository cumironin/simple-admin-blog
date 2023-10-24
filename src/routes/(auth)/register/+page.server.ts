import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { roleToMenuTable, userToRoleTable } from '../../../db/schema';
import { db } from '../../../db/db';

export const load: PageServerLoad = async ({ locals }) => {
	// const session = await locals.auth.validate();
	// if (session) {
	// 	throw redirect(302, '/');
	// }
};

export const actions: Actions = {
	default: async ({ request }) => {
		const { username, password, name, email } = Object.fromEntries(
			await request.formData()
		) as Record<string, string>;

		// const formData = await request.formData();
		// const name = formData.get('name') as string;
		// const username = formData.get('username') as string;
		// const password = formData.get('password') as string;
		// const email = formData.get('email') as string;

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

		throw redirect(302, '/login');
	}
};
