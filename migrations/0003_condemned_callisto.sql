ALTER TABLE `subscriptions` ADD `uuid` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `subscriptions_uuid_unique` ON `subscriptions` (`uuid`);--> statement-breakpoint
ALTER TABLE `walk_submissions` ADD `subscription_uuid` text REFERENCES subscriptions(uuid);--> statement-breakpoint
ALTER TABLE `walk_submissions` ADD `city` text NOT NULL;--> statement-breakpoint
ALTER TABLE `walk_submissions` DROP COLUMN `zip_code`;