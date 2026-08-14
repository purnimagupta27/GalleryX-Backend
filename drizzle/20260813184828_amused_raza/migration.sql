CREATE UNIQUE INDEX "unique_user_post_like" ON "likes" ("userId","postId");--> statement-breakpoint
CREATE INDEX "likes_post_id_idx" ON "likes" ("postId");