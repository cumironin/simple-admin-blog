import { asc, eq, inArray } from 'drizzle-orm';
import { db } from '../../../../db/db';

import {
	menuTable,
	permissionTable,
	roleTable,
	roleTableRelations,
	roleToMenuTable,
	roleToPermissionTable,
	subMenuTable,
	userTable,
	userToRoleTable
} from '../../../../db/schema';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const roleAll = await db
		.select({
			id: roleTable.id,
			rolename: roleTable.roleName
		})
		.from(roleTable);

	const userAll = await db
		.select({
			id: userTable.id,
			name: userTable.name
		})
		.from(userTable);
	const userGroupAll = await db
		.select({
			id: userToRoleTable.id,
			name: userTable.name,
			nameid: userTable.id,
			rolename: roleTable.roleName,
			roleid: roleTable.id
		})
		.from(userTable)
		.leftJoin(userToRoleTable, eq(userToRoleTable.userId, userTable.id))
		.leftJoin(roleTable, eq(roleTable.id, userToRoleTable.roleId));

	const userGroup = await db
		.select({
			id: userToRoleTable.id,
			name: userTable.name,
			nameid: userTable.id,
			rolename: roleTable.roleName,
			roleid: roleTable.id
		})
		.from(userTable)
		.leftJoin(userToRoleTable, eq(userToRoleTable.userId, userTable.id))
		.leftJoin(roleTable, eq(roleTable.id, userToRoleTable.roleId))
		.where(eq(userToRoleTable.id, params.userGroupEdit));
	const userGroupId = userGroup[0];

	return { userGroupAll, userGroupId, roleAll, userAll };
};

export const actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();

		const role = {
			userid: formData.get('user') as any,
			roleid: formData.get('role') as string
		};

		console.log(role);

		// const id = crypto.randomUUID();
		await db
			.update(userToRoleTable)
			.set({
				userId: role.userid,
				roleId: role.roleid
			})
			.where(eq(userToRoleTable.id, params.userGroupEdit));

		throw redirect(302, '/dashboard/usergroup');
	}
};
