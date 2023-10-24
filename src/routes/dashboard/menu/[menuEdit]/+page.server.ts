import { eq } from 'drizzle-orm';
import { db } from '../../../../db/db';
import { redirect } from '@sveltejs/kit';
import { menuTable } from '../../../../db/schema';

export const load = async ({ params }) => {
	const menuAll = await db
		.select({
			id: menuTable.id,
			name: menuTable.name,
			urlRestrict: menuTable.urlRestrict,
			svg: menuTable.svg
		})
		.from(menuTable);

	const menu = await db.select().from(menuTable).where(eq(menuTable.id, params.menuEdit));
	const menuId = menu[0];

	return { menuAll, menuId };
};

export const actions = {
	default: async ({ request, params, url }) => {
		const formData = await request.formData();

		const menu = {
			numsort: formData.get('numsort') as any,
			name: formData.get('name') as string,
			urlrestrict: formData.get('urlrestrict') as string,
			svg: formData.get('svg') as string
		};

		await db
			.update(menuTable)
			.set({
				name: menu.name,
				urlRestrict: menu.urlrestrict,
				svg: menu.svg,
				numsort: menu.numsort
			})
			.where(eq(menuTable.id, params.menuEdit));

		throw redirect(302, '/dashboard/menu');
	}
};
