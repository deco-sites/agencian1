CREATE TABLE `post_views` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`post_slug` text NOT NULL,
	`views` integer DEFAULT 1 NOT NULL,
	`last_viewed` text NOT NULL
);
