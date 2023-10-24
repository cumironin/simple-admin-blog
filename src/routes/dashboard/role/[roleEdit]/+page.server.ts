import {
	and,
	arrayContained,
	arrayContains,
	eq,
	exists,
	inArray,
	not,
	notExists,
	notInArray,
	sql
} from 'drizzle-orm';
import { db } from '../../../../db/db';
import {
	menuTable,
	permissionTable,
	roleTable,
	roleToMenuTable,
	roleToPermissionTable,
	subMenuTable
} from '../../../../db/schema';
import { redirect } from '@sveltejs/kit';
import type { InternetModule } from '@faker-js/faker';

export const load = async ({ params }) => {
	const roleAll = await db
		.select({
			id: roleTable.id,
			name: roleTable.roleName
		})
		.from(roleTable);

	const role = await db.select().from(roleTable).where(eq(roleTable.id, params.roleEdit));
	const roleId = role[0];

	// select from menu.name, role.name where roleMenutable have relation with both
	const menuName = await db
		.select({ name: menuTable.name, id: menuTable.id })
		.from(menuTable)
		.innerJoin(roleToMenuTable, eq(roleToMenuTable.menuId, menuTable.id))
		.innerJoin(roleTable, eq(roleTable.id, roleToMenuTable.roleId))
		.where(eq(roleTable.id, params.roleEdit));

	const permissionName = await db
		.select({ name: permissionTable.name, id: permissionTable.id })
		.from(permissionTable)
		.innerJoin(roleToPermissionTable, eq(roleToPermissionTable.permissionId, permissionTable.id))
		.innerJoin(roleTable, eq(roleTable.id, roleToPermissionTable.roleId))
		.where(eq(roleTable.id, params.roleEdit));

	return { roleId, roleAll, menuName, permissionName };
};

export const actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();

		const role = {
			name: formData.get('rolename') as string,
			arrmenu: formData.get('arrmenu') as string
		};

		// this is for update rolename field
		await db
			.update(roleTable)
			.set({
				roleName: role.name
			})
			.where(eq(roleTable.id, params.roleEdit));

		const arrmenuid = role.arrmenu;
		const arrremove = arrmenuid.replace('[', '');
		const arrremove2 = arrremove.replace(']', '');
		const arrremove3 = arrremove2.replaceAll('"', '');

		// arrMenuName is array formated :
		// [ 'category', 'posts', 'profile', 'dashboard' ]
		const arrId = arrremove3.split(',');

		// menuid is object array menuid formated:
		// [
		// 	{ id: 'd758b896-c78f-47b5-816f-77183ca97806'},
		// 	{ id: '224a2a4a-170f-4553-9438-8dbff94e1bfa'},
		// ]
		const menuid = await db
			.select({ id: menuTable.id })
			.from(menuTable)
			.where(inArray(menuTable.name, arrId));

		// arrMenuId is array formated :
		// [
		//   'd758b896-c78f-47b5-816f-77183ca97806',
		//   '4da191c0-d039-4fcf-b880-d26013a5e45e',
		// ]
		let arrMenuId: string[] = [];
		menuid.forEach((item) => {
			arrMenuId.push(item.id);
		});

		//formated on row has been closed on multiselect
		// object for deleted row
		const idrolerole = await db
			.select({ idmenurole: roleToMenuTable.id })
			.from(roleToMenuTable)
			.where(
				and(
					eq(roleToMenuTable.roleId, params.roleEdit),
					notInArray(roleToMenuTable.menuId, arrMenuId)
				)
			);

		// making array of deleted object row (id)
		const rolrole: any[] = [];
		idrolerole.forEach((item) => {
			rolrole.push(item.idmenurole);
		});

		// delete id of roleToMenuTable
		await db.delete(roleToMenuTable).where(inArray(roleToMenuTable.id, rolrole));

		throw redirect(302, '/dashboard/role');
	}
};
