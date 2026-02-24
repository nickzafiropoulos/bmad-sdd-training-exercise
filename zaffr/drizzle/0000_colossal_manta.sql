CREATE TABLE `zaffr_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256),
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `zaffr_post` (`name`);--> statement-breakpoint
CREATE TABLE `zaffr_todo` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`description` text(2048) NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `todo_created_at_idx` ON `zaffr_todo` (`createdAt`);