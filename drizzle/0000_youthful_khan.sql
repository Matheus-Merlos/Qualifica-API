CREATE TABLE "course-tag" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"course" integer NOT NULL,
	"tag" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"owner" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"salt" varchar(16) NOT NULL,
	"passwordHash" varchar(256) NOT NULL,
	"birthdate" date NOT NULL,
	"bio" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "subscription" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" integer NOT NULL,
	"course" integer NOT NULL,
	CONSTRAINT "subscription_user_course_unique" UNIQUE("user","course")
);
--> statement-breakpoint
ALTER TABLE "course-tag" ADD CONSTRAINT "course-tag_course_course_id_fk" FOREIGN KEY ("course") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_owner_user_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_course_course_id_fk" FOREIGN KEY ("course") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE cascade;