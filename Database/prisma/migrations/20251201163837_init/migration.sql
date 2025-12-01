-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('draft', 'published', 'rejected');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'draft';
