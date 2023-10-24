import { auth } from '$lib/server/lucia';
import { redirect, type Handle } from '@sveltejs/kit';

import { db } from './db/db';
import {
	menuTable,
	roleTable,
	roleToMenuTable,
	subMenuTable,
	userTable,
	userToRoleTable
} from './db/schema';
import { asc, eq, inArray, ne, notInArray } from 'drizzle-orm';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	if (event.locals?.auth) {
		const session = await event.locals.auth.validate();
		const user = session?.user;
		event.locals.user = user;

		if (event.route.id?.startsWith('/dashboard')) {
			if (!user) {
				throw redirect(302, '/login');
			} else {
				const dogol = await db
					.select({
						menurl: menuTable.urlRestrict,
						submenurl: subMenuTable.urlRestrict,
						rolemenu: roleTable.id,
						userid: userTable.id
					})
					.from(userTable)
					.leftJoin(userToRoleTable, eq(userToRoleTable.userId, userTable.id))
					.leftJoin(roleTable, eq(roleTable.id, userToRoleTable.roleId))
					.leftJoin(roleToMenuTable, eq(roleToMenuTable.roleId, roleTable.id))
					.leftJoin(menuTable, eq(menuTable.id, roleToMenuTable.menuId))
					.leftJoin(subMenuTable, eq(subMenuTable.menuId, menuTable.id))
					// .where(eq(userTable.id, `${user?.userId}`));
					.where(eq(userTable.id, String(user?.userId)));

				const pushdogol: string[] = [];
				dogol.forEach((item: { menurl: any }) => {
					pushdogol.push(String(item.menurl));
				});

				const dogse = await db
					.select({
						menurl: menuTable.urlRestrict
					})
					.from(menuTable)
					.where(notInArray(menuTable.urlRestrict, pushdogol));

				const dogsegol: string[] = [];
				dogse.forEach((item: { menurl: any }) => {
					dogsegol.push(item.menurl);
				});

				// console.log(pushdogol);
				// console.log(dogsegol);
				// console.log(event.route.id);

				for (let index = 0; index < dogsegol.length; index++) {
					if (event.route.id === dogsegol[index]) {
						throw redirect(302, '/dashboard');
					}
				}
				// if (event.route.id?.includes(String(dogsegol[2]))) {
				// 	throw redirect(302, '/dashboard');
				// }
			}
		}
	}

	return await resolve(event);
};

// const dogol = await db
// 			.select({
// 				menurl: menuTable.urlRestrict,
// 				submenurl: subMenuTable.urlRestrict,
// 				rolemenu: roleTable.id,
// 				userid: userTable.id
// 			})
// 			.from(userTable)
// 			.leftJoin(userToRoleTable, eq(userToRoleTable.userId, userTable.id))
// 			.leftJoin(roleTable, eq(roleTable.id, userToRoleTable.roleId))
// 			.leftJoin(roleToMenuTable, eq(roleToMenuTable.roleId, roleTable.id))
// 			.leftJoin(menuTable, eq(menuTable.id, roleToMenuTable.menuId))
// 			.leftJoin(subMenuTable, eq(subMenuTable.menuId, menuTable.id))
// 			// .where(eq(userTable.id, `${user?.userId}`));
// 			.where(eq(userTable.id, String(user?.userId)));

// 		const pushdogol: string[] = [];
// 		dogol.forEach((item: { menurl: any }) => {
// 			pushdogol.push(String(item.menurl));
// 		});

// 		const dogse = await db
// 			.select({
// 				menurl: menuTable.urlRestrict
// 			})
// 			.from(menuTable)
// 			.where(notInArray(menuTable.urlRestrict, pushdogol));

// 		const dogsegol: string[] = [];
// 		dogse.forEach((item: { menurl: any }) => {
// 			dogsegol.push(item.menurl);
// 		});

// 		if (event.route.id?.includes(String(dogsegol))) {
// 			if (user) {
// 				throw redirect(302, '/dashboard');
// 			}
// 		}
