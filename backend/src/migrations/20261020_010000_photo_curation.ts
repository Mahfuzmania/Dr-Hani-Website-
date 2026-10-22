import {
  type MigrateUpArgs,
  type MigrateDownArgs,
  sql,
} from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`CREATE TYPE "public"."enum_gallery_items_homepage_section" AS ENUM('medical-work', 'dialogues', 'public-work');
ALTER TABLE "gallery_items" ADD COLUMN "homepage_section" "enum_gallery_items_homepage_section";
ALTER TABLE "gallery_items" ADD COLUMN "focal_x" numeric DEFAULT 50;
ALTER TABLE "gallery_items" ADD COLUMN "focal_y" numeric DEFAULT 50;
ALTER TABLE "homepage" ADD COLUMN "section_visibility_dialogues" boolean DEFAULT true;
ALTER TABLE "homepage" ADD COLUMN "section_visibility_writing" boolean DEFAULT true;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "gallery_items" DROP COLUMN "homepage_section";
ALTER TABLE "gallery_items" DROP COLUMN "focal_x";
ALTER TABLE "gallery_items" DROP COLUMN "focal_y";
ALTER TABLE "homepage" DROP COLUMN "section_visibility_dialogues";
ALTER TABLE "homepage" DROP COLUMN "section_visibility_writing";
DROP TYPE "public"."enum_gallery_items_homepage_section";`)
}
