import { eq } from 'drizzle-orm';
import { db } from '../../db/db';
import { roleTable } from '../../db/schema';

const role = async (id: any) => {
	await db.select().from(roleTable).where(eq(roleTable.id, id));
};
