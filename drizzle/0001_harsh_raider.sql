CREATE UNIQUE INDEX `post_views_post_slug_unique` ON `post_views` (`post_slug`);--> statement-breakpoint
CREATE INDEX `post_slug_idx` ON `post_views` (`post_slug`);