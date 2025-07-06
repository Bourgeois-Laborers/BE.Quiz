/*
  Warnings:

  - The `status` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('OPEN', 'LIVE', 'CLOSED');

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "status",
ADD COLUMN     "status" "SessionStatus" NOT NULL DEFAULT 'OPEN';
