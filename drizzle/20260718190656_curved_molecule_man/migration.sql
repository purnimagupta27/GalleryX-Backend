ALTER TABLE "posts" ALTER COLUMN "url" SET DATA TYPE text USING "url"::text;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "url" SET NOT NULL;