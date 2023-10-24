import { auth } from '$lib/server/lucia';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		throw redirect(302, 'login');
	}

	await auth.invalidateSession(session.sessionId);
	locals.auth.setSession(null);

	throw redirect(302, '/login');
};
