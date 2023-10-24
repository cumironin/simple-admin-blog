import { asc, eq, notInArray } from 'drizzle-orm';
import { db } from '../../db/db';
import {
	menuTable,
	roleTable,
	roleToMenuTable,
	subMenuTable,
	userTable,
	userToRoleTable
} from '../../db/schema';

export const load = async ({ fetch, locals, route }) => {
	const fetchNavbar = async () => {
		const res = await fetch('/api/navbar');
		const data = await res.json();
		// console.log(data);
		return data;
	};

	const routeId = route.id;

	const user = locals.user;

	// can accessed
	const dogol = await db
		.select({
			menurl: menuTable.urlRestrict,
			// submenurl: subMenuTable.urlRestrict,
			// rolemenu: roleTable.id,
			// userid: userTable.id,
			numsort: menuTable.numsort
		})
		.from(userTable)
		.leftJoin(userToRoleTable, eq(userToRoleTable.userId, userTable.id))
		.leftJoin(roleTable, eq(roleTable.id, userToRoleTable.roleId))
		.leftJoin(roleToMenuTable, eq(roleToMenuTable.roleId, roleTable.id))
		.leftJoin(menuTable, eq(menuTable.id, roleToMenuTable.menuId))
		.leftJoin(subMenuTable, eq(subMenuTable.menuId, menuTable.id))
		// .where(eq(userTable.id, `${user?.userId}`));
		.where(eq(userTable.id, String(user?.userId)))
		.orderBy(asc(menuTable.numsort));

	const pushdogol: string[] = [];
	dogol.forEach((item: { menurl: any }) => {
		pushdogol.push(String(item.menurl));
	});

	// unable to accessed
	const dogse = await db
		.select({
			menurl: menuTable.urlRestrict,
			numsort: menuTable.numsort
		})
		.from(menuTable)
		.where(notInArray(menuTable.urlRestrict, pushdogol));

	// convert unabel to access to array null and urlaccess
	dogse.map((el) => {
		el.menurl = null;
	});

	// makin an array for unable to access
	const dogsegol: string[] = [];
	dogse.forEach((item: { menurl: any }) => {
		dogsegol.push(item.menurl);
	});

	//concat object
	const arrAll = [...dogol, ...dogse];

	//sort asc array object
	const allArr = arrAll.sort((a: any, b: any) => {
		return Number(a.numsort) - Number(b.numsort);
	});

	//make to array
	const semuaArr: (string | null)[] = [];
	allArr.forEach((item) => {
		semuaArr.push(item.menurl);
	});

	// check all the fucking array & array object in console at the layout working or not
	return {
		navbar: fetchNavbar(),
		dogsegol,
		pushdogol,
		dogol,
		routeId,
		dogse,
		allArr,
		semuaArr
	};
};
