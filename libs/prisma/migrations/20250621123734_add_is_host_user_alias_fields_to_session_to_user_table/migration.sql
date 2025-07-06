/*
  Warnings:

  - Added the required column `isHost` to the `SessionToUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAlias` to the `SessionToUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionToUser" ADD COLUMN     "isHost" BOOLEAN NOT NULL,
ADD COLUMN     "userAlias" TEXT NOT NULL;
