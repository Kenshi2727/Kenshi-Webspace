-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('POST', 'PROFILE');

-- CreateTable
CREATE TABLE "MediaMetadata" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "mediaType" "MediaType" NOT NULL,
    "serviceRefId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceRef" (
    "id" TEXT NOT NULL,
    "type" "ServiceType" NOT NULL,

    CONSTRAINT "ServiceRef_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MediaMetadata" ADD CONSTRAINT "MediaMetadata_serviceRefId_fkey" FOREIGN KEY ("serviceRefId") REFERENCES "ServiceRef"("id") ON DELETE SET NULL ON UPDATE CASCADE;
