DROP INDEX "blog_posts_slug_unique";--> statement-breakpoint
DROP INDEX "events_slug_unique";--> statement-breakpoint
DROP INDEX "members_email_unique";--> statement-breakpoint
DROP INDEX "profiles_email_unique";--> statement-breakpoint
DROP INDEX "subscriptions_uuid_unique";--> statement-breakpoint
DROP INDEX "subscriptions_email_unique";--> statement-breakpoint
ALTER TABLE `profiles` ALTER COLUMN "email" TO "email" text;--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `events_slug_unique` ON `events` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `members_email_unique` ON `members` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_email_unique` ON `profiles` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `subscriptions_uuid_unique` ON `subscriptions` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `subscriptions_email_unique` ON `subscriptions` (`email`);