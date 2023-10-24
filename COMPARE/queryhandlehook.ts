// const dogol = await db
// 	.select({
// 		menurl: menuTable.urlRestrict,
// 		submenurl: subMenuTable.urlRestrict,
// 		rolemenu: roleTable.id,
// 		userid: userTable.id
// 	})
// 	.from(userTable)
// 	.leftJoin(userToRoleTable, eq(userToRoleTable.userId, userTable.id))
// 	.leftJoin(roleTable, eq(roleTable.id, userToRoleTable.roleId))
// 	.leftJoin(roleToMenuTable, eq(roleToMenuTable.menuId, menuTable.id))
// 	.leftJoin(roleTable, eq(roleTable.id, roleToMenuTable.roleId))
// 	.leftJoin(menuTable, eq(menuTable.id, subMenuTable.menuId))
// 	.where(eq(userTable.id, `${user?.userId}`));

// console.log(user?.userId);

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
