import { inArray } from 'drizzle-orm';
import { db } from '../../../db/db';
import { permissionTable } from '../../../db/schema';

export const load = async ({ url }) => {
	const permissions = await db
		.select({
			id: permissionTable.id,
			name: permissionTable.name,
			urlRestrict: permissionTable.urlRestrict
		})
		.from(permissionTable);

	return { permissions };
};

export const actions = {
	savePermission: async ({ request }) => {
		const formData = await request.formData();

		const permissions = {
			name: formData.get('name') as string,
			urlrestrict: formData.get('urlrestrict') as string
		};

		const id = crypto.randomUUID();

		await db.insert(permissionTable).values({
			id,
			name: permissions.name,
			urlRestrict: permissions.urlrestrict
		});
	},

	delPermission: async ({ url }) => {
		const id = url.searchParams.get('id');
		// console.log(id);

		const splitId = id?.split(',');
		await db.delete(permissionTable).where(inArray(permissionTable.id, splitId)).returning();
	}
};
