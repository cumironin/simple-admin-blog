import { asc, eq, inArray } from 'drizzle-orm';
import { db } from '../../../db/db';
import { menuTable, roleTable } from '../../../db/schema';
import type { integer } from 'drizzle-orm/pg-core';

export const load = async ({ url }) => {
	// console.log(url);

	const menuAll = await db
		.select({
			id: menuTable.id,
			name: menuTable.name,
			urlRestrict: menuTable.urlRestrict,
			svg: menuTable.svg
		})
		.from(menuTable)
		.orderBy(asc(menuTable.name));

	const role = await db
		.select({
			id: roleTable.id,
			name: roleTable.roleName
		})
		.from(roleTable);
	const roleId = role[0];

	return { menuAll, roleId };
};

export const actions = {
	saveMenu: async ({ request }) => {
		const formData = await request.formData();

		const menu = {
			numsort: formData.get('numsort') as any,
			name: formData.get('name') as string,
			urlrestrict: formData.get('urlrestrict') as string,
			svg: formData.get('svg') as string
		};

		const id = crypto.randomUUID();
		await db.insert(menuTable).values({
			id,
			name: menu.name,
			urlRestrict: menu.urlrestrict,
			svg: menu.svg,
			numsort: menu.numsort
		});
	},
	delMenu: async ({ url }) => {
		const id = url.searchParams.get('id') as string;

		await db.delete(menuTable).where(eq(menuTable.id, id)).returning();
	}
};
