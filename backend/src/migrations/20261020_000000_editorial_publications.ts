import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`CREATE TYPE "public"."enum_publications_kind" AS ENUM('essay', 'report');
CREATE TYPE "public"."enum_publications_status" AS ENUM('draft', 'published');
CREATE TYPE "public"."enum__publications_v_version_kind" AS ENUM('essay', 'report');
CREATE TYPE "public"."enum__publications_v_version_status" AS ENUM('draft', 'published');
CREATE TABLE "publications_topics" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar
);

CREATE TABLE "publications_sources" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"publisher" varchar,
	"url" varchar,
	"byline" varchar,
	"published_at" timestamp(3) with time zone,
	"date_label" varchar
);

CREATE TABLE "publications" (
	"id" serial PRIMARY KEY NOT NULL,
	"external_id" varchar,
	"kind" "enum_publications_kind",
	"title" varchar,
	"summary" varchar,
	"image_id" integer,
	"image_path" varchar,
	"related_activity" varchar,
	"featured" boolean DEFAULT false,
	"status" "enum_publications_status" DEFAULT 'draft',
	"verification_notes" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_publications_status" DEFAULT 'draft'
);

CREATE TABLE "_publications_v_version_topics" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar,
	"_uuid" varchar
);

CREATE TABLE "_publications_v_version_sources" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"publisher" varchar,
	"url" varchar,
	"byline" varchar,
	"published_at" timestamp(3) with time zone,
	"date_label" varchar,
	"_uuid" varchar
);

CREATE TABLE "_publications_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_external_id" varchar,
	"version_kind" "enum__publications_v_version_kind",
	"version_title" varchar,
	"version_summary" varchar,
	"version_image_id" integer,
	"version_image_path" varchar,
	"version_related_activity" varchar,
	"version_featured" boolean DEFAULT false,
	"version_status" "enum__publications_v_version_status" DEFAULT 'draft',
	"version_verification_notes" varchar,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__publications_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean,
	"autosave" boolean
);

ALTER TABLE "gallery_items" ADD COLUMN "external_id" varchar;
ALTER TABLE "gallery_items" ADD COLUMN "event" varchar;
ALTER TABLE "gallery_items" ADD COLUMN "related_activity" varchar;
ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "publications_id" integer;
ALTER TABLE "publications_topics" ADD CONSTRAINT "publications_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "publications_sources" ADD CONSTRAINT "publications_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "publications" ADD CONSTRAINT "publications_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "_publications_v_version_topics" ADD CONSTRAINT "_publications_v_version_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_publications_v_version_sources" ADD CONSTRAINT "_publications_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_parent_id_publications_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."publications"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
CREATE INDEX "publications_topics_order_idx" ON "publications_topics" USING btree ("_order");
CREATE INDEX "publications_topics_parent_id_idx" ON "publications_topics" USING btree ("_parent_id");
CREATE INDEX "publications_sources_order_idx" ON "publications_sources" USING btree ("_order");
CREATE INDEX "publications_sources_parent_id_idx" ON "publications_sources" USING btree ("_parent_id");
CREATE UNIQUE INDEX "publications_external_id_idx" ON "publications" USING btree ("external_id");
CREATE INDEX "publications_image_idx" ON "publications" USING btree ("image_id");
CREATE INDEX "publications_updated_at_idx" ON "publications" USING btree ("updated_at");
CREATE INDEX "publications_created_at_idx" ON "publications" USING btree ("created_at");
CREATE INDEX "publications__status_idx" ON "publications" USING btree ("_status");
CREATE INDEX "_publications_v_version_topics_order_idx" ON "_publications_v_version_topics" USING btree ("_order");
CREATE INDEX "_publications_v_version_topics_parent_id_idx" ON "_publications_v_version_topics" USING btree ("_parent_id");
CREATE INDEX "_publications_v_version_sources_order_idx" ON "_publications_v_version_sources" USING btree ("_order");
CREATE INDEX "_publications_v_version_sources_parent_id_idx" ON "_publications_v_version_sources" USING btree ("_parent_id");
CREATE INDEX "_publications_v_parent_idx" ON "_publications_v" USING btree ("parent_id");
CREATE INDEX "_publications_v_version_version_external_id_idx" ON "_publications_v" USING btree ("version_external_id");
CREATE INDEX "_publications_v_version_version_image_idx" ON "_publications_v" USING btree ("version_image_id");
CREATE INDEX "_publications_v_version_version_updated_at_idx" ON "_publications_v" USING btree ("version_updated_at");
CREATE INDEX "_publications_v_version_version_created_at_idx" ON "_publications_v" USING btree ("version_created_at");
CREATE INDEX "_publications_v_version_version__status_idx" ON "_publications_v" USING btree ("version__status");
CREATE INDEX "_publications_v_created_at_idx" ON "_publications_v" USING btree ("created_at");
CREATE INDEX "_publications_v_updated_at_idx" ON "_publications_v" USING btree ("updated_at");
CREATE INDEX "_publications_v_latest_idx" ON "_publications_v" USING btree ("latest");
CREATE INDEX "_publications_v_autosave_idx" ON "_publications_v" USING btree ("autosave");
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
CREATE UNIQUE INDEX "gallery_items_external_id_idx" ON "gallery_items" USING btree ("external_id");
CREATE INDEX "payload_locked_documents_rels_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("publications_id");`)
}

// Rollback removes the new archive data. Export it before invoking down.
export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "publications_topics" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "publications_sources" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "publications" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "_publications_v_version_topics" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "_publications_v_version_sources" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "_publications_v" DISABLE ROW LEVEL SECURITY;
DROP TABLE "publications_topics" CASCADE;
DROP TABLE "publications_sources" CASCADE;
DROP TABLE "publications" CASCADE;
DROP TABLE "_publications_v_version_topics" CASCADE;
DROP TABLE "_publications_v_version_sources" CASCADE;
DROP TABLE "_publications_v" CASCADE;
ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_publications_fk";

DROP INDEX "gallery_items_external_id_idx";
DROP INDEX "payload_locked_documents_rels_publications_id_idx";
ALTER TABLE "gallery_items" DROP COLUMN "external_id";
ALTER TABLE "gallery_items" DROP COLUMN "event";
ALTER TABLE "gallery_items" DROP COLUMN "related_activity";
ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "publications_id";
DROP TYPE "public"."enum_publications_kind";
DROP TYPE "public"."enum_publications_status";
DROP TYPE "public"."enum__publications_v_version_kind";
DROP TYPE "public"."enum__publications_v_version_status";`)
}
