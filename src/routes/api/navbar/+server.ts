import { asc, eq } from 'drizzle-orm';
import { db } from '../../../db/db';
import { menuTable, subMenuTable, userTable } from '../../../db/schema';

export async function GET(event) {
	const result = await db.query.menuTable.findMany({
		with: {
			SubMenu: true
		},
		orderBy: [asc(menuTable.numsort)]
	});

	return new Response(JSON.stringify(result));
}
