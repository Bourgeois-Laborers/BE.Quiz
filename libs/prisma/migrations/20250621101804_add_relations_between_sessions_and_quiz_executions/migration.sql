/*
  Warnings:

  - Added the required column `sessionId` to the `QuizExecution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuizExecution" ADD COLUMN     "sessionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "QuizExecution" ADD CONSTRAINT "QuizExecution_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
