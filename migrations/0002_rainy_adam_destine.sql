CREATE TABLE `walk_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`experience` text NOT NULL,
	`interests` text NOT NULL,
	`zip_code` text NOT NULL,
	`accountability` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL
);
