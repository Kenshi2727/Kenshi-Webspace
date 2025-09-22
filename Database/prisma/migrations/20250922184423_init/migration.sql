/*
  Warnings:

  - You are about to drop the column `authorImg` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `coverImg` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "authorImg",
DROP COLUMN "coverImg",
ADD COLUMN     "authorImage" TEXT,
ADD COLUMN     "coverImage" TEXT;
