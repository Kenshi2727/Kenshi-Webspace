/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `MediaMetaData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MediaMetaData_publicId_key" ON "MediaMetaData"("publicId");
