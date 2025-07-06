/*
  Warnings:

  - The `status` column on the `QuizExecution` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "QuizExecutionStatus" AS ENUM ('PENDING', 'EXECUTING', 'PAUSED', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "QuizExecution" DROP COLUMN "status",
ADD COLUMN     "status" "QuizExecutionStatus" NOT NULL DEFAULT 'COMPLETED';
