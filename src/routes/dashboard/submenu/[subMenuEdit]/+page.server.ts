import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import { menuTable, subMenuTable } from '../../../../db/schema';
import { db } from '../../../../db/db';

export const load = async ({ params }) => {
	const subMenuAll = await db
		.select({
			id: subMenuTable.id,
			name: subMenuTable.name,
			urlRestrict: subMenuTable.urlRestrict,
			menuId: subMenuTable.menuId
		})
		.from(subMenuTable);

	const menuAll = await db
		.select({
			id: menuTable.id,
			name: menuTable.name
		})
		.from(menuTable);

	const menu = await db.select().from(subMenuTable).where(eq(subMenuTable.id, params.subMenuEdit));
	const subMenuId = menu[0];

	const option = await db
		.select({
			id: subMenuTable.menuId
		})
		.from(subMenuTable)
		.where(eq(subMenuTable.id, params.subMenuEdit));
	const optionId = option[0];

	return { subMenuAll, subMenuId, menuAll, optionId };
};

export const actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();

		const menu = {
			name: formData.get('name') as string,
			urlrestrict: formData.get('urlrestrict') as string,
			submenu: formData.get('submenu') as string
		};

		await db
			.update(subMenuTable)
			.set({
				name: menu.name,
				urlRestrict: menu.urlrestrict,
				menuId: menu.submenu
			})
			.where(eq(subMenuTable.id, params.subMenuEdit));

		throw redirect(302, '/dashboard/submenu');
	}
};
