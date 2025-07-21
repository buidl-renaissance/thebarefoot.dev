CREATE TABLE `blog_post_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`blog_post_id` integer NOT NULL,
	`field` text NOT NULL,
	`old_value` text,
	`new_value` text,
	`changed_at` integer NOT NULL
);
