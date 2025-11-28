-- DropForeignKey
ALTER TABLE "PostActions" DROP CONSTRAINT "PostActions_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostActions" DROP CONSTRAINT "PostActions_userId_fkey";

-- AddForeignKey
ALTER TABLE "PostActions" ADD CONSTRAINT "PostActions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostActions" ADD CONSTRAINT "PostActions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
