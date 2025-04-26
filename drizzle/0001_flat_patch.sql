ALTER TABLE "course-tag" RENAME TO "course_tag";--> statement-breakpoint
ALTER TABLE "course_tag" DROP CONSTRAINT "course-tag_course_course_id_fk";
--> statement-breakpoint
ALTER TABLE "course_tag" ADD CONSTRAINT "course_tag_course_course_id_fk" FOREIGN KEY ("course") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE cascade;