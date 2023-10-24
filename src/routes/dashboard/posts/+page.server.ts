// import { eq, sql } from 'drizzle-orm';
// import { db } from '../../../db/db';
// import {
// 	categoryTable,
// 	permissionTable,
// 	postOnCategoryRelations,
// 	postOnCategoryTable,
// 	postTable,
// 	roleTable,
// 	roleToPermissionTable,
// 	userTable,
// 	userToRoleTable
// } from '../../../db/schema';

// export const load = async () => {
// 	const usersSelect = await db
// 		.select({
// 			id: userTable.id,
// 			fullname: userTable.fullName,
// 			username: sql`lower(${userTable.username})`,
// 			email: userTable.email
// 		})
// 		.from(userTable);

// 	const permission = await db
// 		.select({
// 			name: permissionTable.name,
// 			url: permissionTable.urlRestrict
// 		})
// 		.from(permissionTable)
// 		.innerJoin(roleToPermissionTable, eq(roleToPermissionTable.permissionId, permissionTable.id))
// 		.innerJoin(roleTable, eq(roleTable.id, roleToPermissionTable.roleId))
// 		.innerJoin(userToRoleTable, eq(userToRoleTable.roleId, roleTable.id))
// 		.innerJoin(userTable, eq(userTable.id, userToRoleTable.userId))
// 		.where(eq(userTable.id, '1509b013-79f9-4f64-9133-b5f80adb585c'));

// 	console.log(permission);

// 	return { usersSelect, permission };
// };
