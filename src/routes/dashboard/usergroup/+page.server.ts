import { asc, eq, inArray } from 'drizzle-orm';
import { db } from '../../../db/db';
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
} from '../../../db/schema';

export const load = async ({ url }) => {
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
		.leftJoin(roleTable, eq(roleTable.id, userToRoleTable.roleId));

	return { roleAll, userAll, userGroup };
};

export const actions = {
	saveGroup: async ({ request }) => {
		const formData = await request.formData();

		const role = {
			userid: formData.get('user') as any,
			roleid: formData.get('role') as string
		};

		console.log(role);

		const id = crypto.randomUUID();
		await db.insert(userToRoleTable).values({
			id,
			userId: role.userid,
			roleId: role.roleid
		});
	},
	delGroup: async ({ url }) => {
		const id = url.searchParams.get('id') as string;
		await db.delete(userToRoleTable).where(eq(userToRoleTable.id, id)).returning();
	}
};
