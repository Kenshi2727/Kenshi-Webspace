-- AlterEnum
ALTER TYPE "ServiceType" ADD VALUE 'CONTENT';

-- AlterTable
ALTER TABLE "MediaMetaData" ADD COLUMN     "orphan" BOOLEAN NOT NULL DEFAULT true;
