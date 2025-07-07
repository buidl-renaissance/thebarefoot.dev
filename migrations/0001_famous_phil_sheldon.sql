ALTER TABLE `blog_posts` ADD `deleted_at` integer;--> statement-breakpoint
ALTER TABLE `events` ADD `deleted_at` integer;--> statement-breakpoint
ALTER TABLE `members` ADD `deleted_at` integer;--> statement-breakpoint
ALTER TABLE `projects` ADD `data` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `deleted_at` integer;--> statement-breakpoint
ALTER TABLE `projects` DROP COLUMN `github_url`;--> statement-breakpoint
ALTER TABLE `projects` DROP COLUMN `live_url`;