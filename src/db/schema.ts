import { relations } from 'drizzle-orm';
import {
	bigint,
	integer,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
	uuid,
	varchar
} from 'drizzle-orm/pg-core';

export const userTable = pgTable('auth_user', {
	id: varchar('id', { length: 255 }).primaryKey(),
	numsort: serial('numshort'),
	username: varchar('username', { length: 256 }).unique(),
	email: varchar('email', { length: 100 }),
	name: varchar('name', { length: 100 }),
	createdAt: timestamp('created_at').defaultNow()
});

// users to post (many)
export const userRelations = relations(userTable, ({ many }) => ({
	post: many(postTable),
	role: many(roleTable)
}));

export const postTable = pgTable('post', {
	id: varchar('id', { length: 255 }).primaryKey(),
	title: varchar('title', { length: 200 }),
	metatitle: varchar('meta_title', { length: 200 }),
	slug: varchar('slug', { length: 200 }),
	content: text('content'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at'),
	authorId: varchar('author_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' })
		.notNull()
});

// post to users (one) | post to postOnCategories (many)
export const postRelations = relations(postTable, ({ one, many }) => ({
	author: one(userTable, {
		fields: [postTable.authorId],
		references: [userTable.id]
	}),

	categoryPost: many(postOnCategoryTable),
	postMeta: many(userToRoleTable)
}));

export const categoryTable = pgTable('category', {
	id: varchar('id', { length: 255 }).primaryKey(),
	title: varchar('title', { length: 200 }),
	metatitle: varchar('meta_title', { length: 200 }),
	slug: varchar('slug', { length: 200 }),
	description: text('description')
});

// categories to postOnCategories (many)
export const categoryRelation = relations(categoryTable, ({ many }) => ({
	postCategory: many(postOnCategoryTable)
}));

export const postOnCategoryTable = pgTable(
	'post_categories',
	{
		id: varchar('id', { length: 255 }).primaryKey(),
		postId: varchar('post_id')
			.notNull()
			.references(() => postTable.id, { onDelete: 'cascade' })
			.notNull(),
		categoryId: varchar('category_id')
			.notNull()
			.references(() => categoryTable.id, { onDelete: 'cascade' })
			.notNull()
	}
	// (t) => ({
	// 	pk: primaryKey(t.postId, t.categoryId)
	// })
);

// postOnCategories to post (one) | postOnCategories to categories (one)
export const postOnCategoryRelations = relations(postOnCategoryTable, ({ one }) => ({
	post: one(postTable, {
		fields: [postOnCategoryTable.postId],
		references: [postTable.id]
	}),

	category: one(categoryTable, {
		fields: [postOnCategoryTable.categoryId],
		references: [categoryTable.id]
	})
}));

export const imageTable = pgTable('linkImage', {
	id: varchar('id', { length: 255 }).primaryKey(),
	url: varchar('url', { length: 255 }),
	name: varchar('name', { length: 255 }),
	image: varchar('image', { length: 255 }),
	description: varchar('description', { length: 255 })
});

export const postMetaTable = pgTable('post_meta', {
	id: varchar('id', { length: 255 }).primaryKey(),
	key: varchar('key', { length: 100 }),
	content: text('content'),
	postMetaId: varchar('post_meta_id')
		.notNull()
		.references(() => postTable.id, { onDelete: 'cascade' })
		.notNull()
});

// postMeta to Post (one)
export const PostMetaRelation = relations(postMetaTable, ({ one }) => ({
	metaPost: one(postTable, {
		fields: [postMetaTable.postMetaId],
		references: [postTable.id]
	})
}));

export const userToRoleTable = pgTable('user_role', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' })
		.notNull(),
	roleId: varchar('role_id')
		.notNull()
		.references(() => roleTable.id, { onDelete: 'cascade' })
		.notNull()
});

export const roleTable = pgTable('Role', {
	id: varchar('id', { length: 255 }).primaryKey(),
	numsort: integer('numsort'),
	roleName: varchar('role_name', { length: 100 })
});

export const roleTableRelations = relations(roleTable, ({ many }) => ({
	roleUser: many(userToRoleTable),
	rolePermission: many(roleToPermissionTable),
	roleMenu: many(roleToMenuTable)
}));

export const roleToPermissionTable = pgTable('role_permission', {
	id: varchar('id', { length: 255 }).primaryKey(),
	roleId: varchar('role_id')
		.notNull()
		.references(() => roleTable.id, { onDelete: 'cascade' })
		.notNull(),
	permissionId: varchar('permission_id')
		.notNull()
		.references(() => permissionTable.id, { onDelete: 'cascade' })
		.notNull()
});

export const permissionTable = pgTable('permission', {
	id: varchar('id', { length: 255 }).primaryKey(),
	name: varchar('name', { length: 100 }),
	urlRestrict: varchar('url_restrict', { length: 100 })
});

export const permissionTableRelations = relations(permissionTable, ({ many }) => ({
	permissionRole: many(roleToPermissionTable)
}));

export const roleToMenuTable = pgTable('role_menu', {
	id: varchar('id', { length: 255 }).primaryKey(),
	roleId: varchar('role_id')
		.notNull()
		.references(() => roleTable.id, { onDelete: 'cascade' })
		.notNull(),
	menuId: varchar('menu_id')
		.notNull()
		.references(() => menuTable.id, { onDelete: 'cascade' })
		.notNull()
});

export const menuTable = pgTable('menu', {
	id: varchar('id', { length: 255 }).primaryKey(),
	numsort: integer('numsort'),
	name: varchar('name', { length: 100 }),
	urlRestrict: varchar('url_restrict', { length: 100 }),
	svg: varchar('svg', { length: 512 })
});

export const menuTableRelations = relations(menuTable, ({ many }) => ({
	menuRole: many(roleToMenuTable),
	SubMenu: many(subMenuTable)
}));

export const subMenuTable = pgTable('sub_menu', {
	id: varchar('id', { length: 255 }).primaryKey(),
	numsort: integer('numsort'),
	name: varchar('name', { length: 100 }),
	urlRestrict: varchar('url_restrict', { length: 100 }),
	menuId: varchar('menu_id')
		.notNull()
		.references(() => menuTable.id, { onDelete: 'cascade' })
		.notNull()
});

export const SubMenuTableRelations = relations(subMenuTable, ({ one }) => ({
	menu: one(menuTable, {
		fields: [subMenuTable.menuId],
		references: [menuTable.id]
	})
}));

export const session = pgTable('user_session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id')
		.notNull()
		.references(() => userTable.id),
	activeExpires: bigint('active_expires', { mode: 'number' }).notNull(),
	idleExpires: bigint('idle_expires', { mode: 'number' }).notNull()
});

export const key = pgTable('user_key', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id')
		.notNull()
		.references(() => userTable.id),
	hashedPassword: varchar('hashed_password', { length: 255 })
});
