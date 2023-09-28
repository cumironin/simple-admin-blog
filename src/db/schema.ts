import { relations } from 'drizzle-orm';
import { integer, pgTable, primaryKey, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	fullName: text('full_name'),
	email: varchar('email', { length: 100 }),
	username: varchar('phone', { length: 256 }),
	password: varchar('password', { length: 32 }),
	createdAt: timestamp('created_at').defaultNow()
});

// users to post (many)
export const usersRelations = relations(users, ({ many }) => ({
	post: many(post)
}));

export const post = pgTable('post', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: varchar('title', { length: 200 }),
	metatitle: varchar('meta_title', { length: 200 }),
	slug: varchar('slug', { length: 200 }),
	content: text('content'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at'),
	authorId: uuid('author_id')
		.notNull()
		.references(() => users.id)
});

// post to users (one) | post to postOnCategories (many)
export const postRelations = relations(post, ({ one, many }) => ({
	author: one(users, {
		fields: [post.authorId],
		references: [users.id]
	}),

	categoryPost: many(postOnCategories),

	postMeta: many(postMeta)
}));

export const categories = pgTable('category', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: varchar('title', { length: 200 }),
	metatitle: varchar('meta_title', { length: 200 }),
	slug: varchar('slug', { length: 200 }),
	description: text('description')
});

// categories to postOnCategories (many)
export const categoryRelation = relations(categories, ({ many }) => ({
	postCategory: many(postOnCategories)
}));

export const postOnCategories = pgTable(
	'post_categories',
	{
		postId: uuid('post_id')
			.notNull()
			.references(() => post.id),
		categoryId: uuid('category_id')
			.notNull()
			.references(() => categories.id)
	},
	(t) => ({
		pk: primaryKey(t.postId, t.categoryId)
	})
);

// postOnCategories to post (one) | postOnCategories to categories (one)
export const postOnCategoriesRelations = relations(postOnCategories, ({ one }) => ({
	post: one(post, {
		fields: [postOnCategories.postId],
		references: [post.id]
	}),

	category: one(categories, {
		fields: [postOnCategories.categoryId],
		references: [categories.id]
	})
}));

export const linkImage = pgTable('linkImage', {
	id: uuid('id').primaryKey().defaultRandom(),
	url: varchar('url', { length: 255 }),
	name: varchar('name', { length: 255 }),
	image: varchar('image', { length: 255 }),
	description: varchar('description', { length: 255 })
});

export const postMeta = pgTable('post_meta', {
	id: uuid('id').primaryKey().defaultRandom(),
	key: varchar('key', { length: 100 }),
	content: text('content'),
	postMetaId: uuid('post_meta_id')
		.notNull()
		.references(() => post.id)
});

// postMeta to Post (one)
export const PostOnMeta = relations(postMeta, ({ one }) => ({
	metaPost: one(post, {
		fields: [postMeta.postMetaId],
		references: [post.id]
	})
}));
