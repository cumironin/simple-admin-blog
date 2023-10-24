ALTER TABLE "role_menu" DROP CONSTRAINT "role_menu_id_Role_id_fk";
--> statement-breakpoint
ALTER TABLE "role_menu" ALTER COLUMN "id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "role_menu" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "role_menu" ADD COLUMN "role_id" varchar NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "role_menu" ADD CONSTRAINT "role_menu_role_id_Role_id_fk" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
