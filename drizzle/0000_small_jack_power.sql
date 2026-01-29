CREATE TABLE "pastes" (
	"id" varchar(8) PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"remainingViews" integer,
	"expires_at" timestamp with time zone,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX "pastes_expires_idx" ON "pastes" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "pastes_created_idx" ON "pastes" USING btree ("created_at");