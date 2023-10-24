import { eq } from 'drizzle-orm';
import { db } from '../../../db/db';
import { menuTable, subMenuTable } from '../../../db/schema';

export const load = async ({}) => {
	const SubMenuAll = await db
		.select({
			id: subMenuTable.id,
			name: subMenuTable.name,
			urlRestrict: subMenuTable.urlRestrict,
			menuId: subMenuTable.menuId
		})
		.from(subMenuTable);

	const menuId = await db
		.select({
			id: menuTable.id,
			name: menuTable.name
		})
		.from(menuTable);

	return { SubMenuAll, menuId };
};

export const actions = {
	saveSubMenu: async ({ request }) => {
		const formData = await request.formData();

		const menu = {
			name: formData.get('name') as string,
			urlrestrict: formData.get('urlrestrict') as string,
			submenu: formData.get('submenu') as string
		};

		const id = crypto.randomUUID();

		await db.insert(subMenuTable).values({
			id,
			name: menu.name,
			urlRestrict: menu.urlrestrict,
			menuId: menu.submenu
		});
	},
	delSubMenu: async ({ url }) => {
		const id = url.searchParams.get('id') as string;

		await db.delete(subMenuTable).where(eq(subMenuTable.id, id)).returning();
	}
};
