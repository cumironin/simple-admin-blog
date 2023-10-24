import { asc, eq, inArray } from 'drizzle-orm';
import { db } from '../../../db/db';
import {
	menuTable,
	permissionTable,
	roleTable,
	roleToMenuTable,
	roleToPermissionTable,
	subMenuTable
} from '../../../db/schema';

export const load = async ({ url }) => {
	const roleAll = await db
		.select({
			id: roleTable.id,
			rolename: roleTable.roleName
		})
		.from(roleTable);

	const menuAll = await db
		.select({
			id: menuTable.id,
			name: menuTable.name
		})
		.from(menuTable)
		.orderBy(asc(menuTable.numsort));

	const permissionAll = await db
		.select({
			id: permissionTable.id,
			name: permissionTable.name
		})
		.from(permissionTable);

	return { roleAll, menuAll, permissionAll };
};

export const actions = {
	saveRole: async ({ request }) => {
		const formData = await request.formData();

		const role = {
			numsort: formData.get('numsort') as any,
			rolename: formData.get('rolename') as string,
			arrmenu: formData.get('arrmenu') as string,
			arrpermission: formData.get('arrpermission') as string
		};

		const id = crypto.randomUUID();

		await db.insert(roleTable).values({
			id,
			roleName: role.rolename,
			numsort: role.numsort
		});

		const arrmenuid = role.arrmenu;
		const arrremove = arrmenuid.replace('[', '');
		const arrremove2 = arrremove.replace(']', '');
		const arrremove3 = arrremove2.replaceAll('"', '');

		const arrId = arrremove3.split(',');

		const menuid = await db
			.select({ id: menuTable.id })
			.from(menuTable)
			.where(inArray(menuTable.name, arrId));

		let arrMenuId: string[] = [];
		menuid.forEach((item) => {
			arrMenuId.push(item.id);
		});

		for (let index = 0; index < arrMenuId.length; index++) {
			await db
				.insert(roleToMenuTable)
				.values({ id: crypto.randomUUID(), roleId: id, menuId: arrMenuId[index] });
		}

		// START INPUT PERMISSION
		const arrpermission = role.arrpermission;
		const arrpermissionremove = arrpermission.replace('[', '');
		const arrpermissionremove2 = arrpermissionremove.replace(']', '');
		const arrpermissionremove3 = arrpermissionremove2.replaceAll('"', '');

		const arrPerm = arrpermissionremove3.split(',');

		const permid = await db
			.select({ id: permissionTable.id })
			.from(permissionTable)
			.where(inArray(permissionTable.name, arrPerm));

		let arrPermId: string[] = [];
		permid.forEach((item) => {
			arrPermId.push(item.id);
		});

		for (let index = 0; index < arrPermId.length; index++) {
			await db
				.insert(roleToPermissionTable)
				.values({ id: crypto.randomUUID(), roleId: id, permissionId: arrPermId[index] });
		}
	},
	delRole: async ({ url }) => {
		const id = url.searchParams.get('id') as string;
		await db.delete(roleTable).where(eq(roleTable.id, id)).returning();
	}
};
