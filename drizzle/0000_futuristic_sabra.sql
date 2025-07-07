CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`date` integer NOT NULL,
	`location` text,
	`type` text NOT NULL,
	`max_participants` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `members` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`role` text,
	`location` text,
	`bio` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `members_email_unique` ON `members` (`email`);--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'active' NOT NULL,
	`github_url` text,
	`live_url` text,
	`tags` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`created_at` integer NOT NULL,
	`source` text DEFAULT 'website' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscriptions_email_unique` ON `subscriptions` (`email`);