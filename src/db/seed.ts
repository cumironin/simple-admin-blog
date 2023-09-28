// src/db/seed.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { categories, linkImage, post, postOnCategories, users } from './schema';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

if (!('DATABASE_URL' in process.env)) throw new Error('DATABASE_URL not found on .env.development');

const main = async () => {
	const client = new Pool({
		connectionString: process.env.DATABASE_URL
	});
	const db = drizzle(client);

	const dataUser: (typeof users.$inferInsert)[] = [];
	for (let i = 0; i < 3; i++) {
		dataUser.push({
			id: faker.string.uuid(),
			fullName: faker.internet.displayName(),
			email: faker.internet.email(),
			username: faker.internet.userName(),
			password: faker.internet.password(),
			createdAt: faker.date.anytime()
		});
	}

	const datapost: (typeof post.$inferInsert)[] = [];
	for (let i = 0; i < 6; i++) {
		datapost.push({
			id: faker.string.uuid(),
			title: faker.lorem.sentence(5),
			metatitle: faker.lorem.sentence(5),
			slug: faker.lorem.slug(),
			content: faker.lorem.paragraphs(10),
			createdAt: faker.date.anytime(),
			updatedAt: faker.date.anytime(),
			authorId: faker.helpers.arrayElement(dataUser).id
		});
	}

	const dataImage: (typeof linkImage.$inferInsert)[] = [];
	for (let i = 0; i < 6; i++) {
		dataImage.push({
			id: faker.string.uuid(),
			url: faker.internet.url(),
			name: faker.lorem.words(),
			image: faker.image.avatar(),
			description: faker.lorem.sentence(5)
		});
	}

	const dataCategory: (typeof categories.$inferInsert)[] = [];
	for (let i = 0; i < 6; i++) {
		dataCategory.push({
			id: faker.string.uuid(),
			title: faker.lorem.sentence(6),
			metatitle: faker.lorem.sentence(6),
			slug: faker.lorem.slug(),
			description: faker.lorem.paragraph()
		});
	}

	const dataPostCategory: (typeof postOnCategories.$inferInsert)[] = [];
	for (let i = 0; i < 6; i++) {
		dataPostCategory.push({
			postId: faker.helpers.arrayElement(datapost).id,
			categoryId: faker.helpers.arrayElement(dataCategory).id
		});
	}

	console.log('Seed start');
	await db.insert(users).values(dataUser);
	await db.insert(post).values(datapost);
	await db.insert(linkImage).values(dataImage);
	await db.insert(categories).values(dataCategory);
	await db.insert(postOnCategories).values(dataPostCategory);

	console.log('Seed done');
};

main();

// export const postOnCategories = pgTable(
// 	'post_categories',
// 	{
// 		postId: uuid('post_id')
// 			.notNull()
// 			.references(() => post.id),
// 		categoryId: uuid('category_id')
// 			.notNull()
// 			.references(() => categories.id)
// 	},
// 	(t) => ({
// 		pk: primaryKey(t.postId, t.categoryId)
// 	})
// );
