/*
  Warnings:

  - You are about to drop the column `order` on the `QuizAnswer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuizAnswer" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "QuizQuestion" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;
