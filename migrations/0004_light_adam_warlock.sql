ALTER TABLE `events` ADD `slug` text NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `start_datetime` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `end_datetime` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `image_url` text;--> statement-breakpoint
ALTER TABLE `events` ADD `data` text;--> statement-breakpoint
CREATE UNIQUE INDEX `events_slug_unique` ON `events` (`slug`);--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `date`;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `max_participants`;