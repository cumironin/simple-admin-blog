import { eq } from 'drizzle-orm';
import { db } from '../../../../db/db';
import { permissionTable } from '../../../../db/schema';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const permissionAll = await db
		.select({
			id: permissionTable.id,
			name: permissionTable.name,
			urlRestrict: permissionTable.urlRestrict
		})
		.from(permissionTable);

	const permission = await db
		.select()
		.from(permissionTable)
		.where(eq(permissionTable.id, params.permissionId));

	const permissionsId = permission[0];

	return { permissionsId, permissionAll };
};

export const actions = {
	default: async ({ request, params, url }) => {
		console.log(url.pathname.match);

		const formData = await request.formData();

		const permissions = {
			name: formData.get('name') as string,
			urlrestrict: formData.get('urlrestrict') as string
		};

		await db
			.update(permissionTable)
			.set({
				name: permissions.name,
				urlRestrict: permissions.urlrestrict
			})
			.where(eq(permissionTable.id, params.permissionId));

		throw redirect(302, '/dashboard/permission');
	}
};
