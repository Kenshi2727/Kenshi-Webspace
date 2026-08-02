/*
  Warnings:

  - You are about to drop the `MediaMetadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."MediaMetadata" DROP CONSTRAINT "MediaMetadata_serviceRefId_fkey";

-- DropTable
DROP TABLE "public"."MediaMetadata";

-- CreateTable
CREATE TABLE "MediaMetaData" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "mediaType" "MediaType" NOT NULL,
    "serviceRefId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaMetaData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MediaMetaData" ADD CONSTRAINT "MediaMetaData_serviceRefId_fkey" FOREIGN KEY ("serviceRefId") REFERENCES "ServiceRef"("id") ON DELETE SET NULL ON UPDATE CASCADE;
