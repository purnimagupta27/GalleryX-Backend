ALTER TABLE "boards" DROP CONSTRAINT "boards_postId_posts_id_fkey";--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "boardId" uuid;--> statement-breakpoint
ALTER TABLE "boards" DROP COLUMN "postId";--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_boardId_boards_id_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "boards" DROP CONSTRAINT "boards_userId_users_id_fkey", ADD CONSTRAINT "boards_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_users_id_fkey", ADD CONSTRAINT "comments_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_posts_id_fkey", ADD CONSTRAINT "comments_postId_posts_id_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "follows" DROP CONSTRAINT "follows_followerId_users_id_fkey", ADD CONSTRAINT "follows_followerId_users_id_fkey" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "follows" DROP CONSTRAINT "follows_followingId_users_id_fkey", ADD CONSTRAINT "follows_followingId_users_id_fkey" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "likes_userId_users_id_fkey", ADD CONSTRAINT "likes_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "likes_postId_posts_id_fkey", ADD CONSTRAINT "likes_postId_posts_id_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_userId_users_id_fkey", ADD CONSTRAINT "posts_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "searches" DROP CONSTRAINT "searches_userId_users_id_fkey", ADD CONSTRAINT "searches_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;