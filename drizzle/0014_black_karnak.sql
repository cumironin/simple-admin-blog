ALTER TABLE "post_categories" DROP CONSTRAINT "post_categories_post_id_category_id";--> statement-breakpoint
ALTER TABLE "user_role" ADD COLUMN "id" varchar(255) NOT NULL;