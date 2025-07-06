-- AlterTable
ALTER TABLE "QuizExecution" ADD COLUMN     "finishedAt" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'COMPLETED';
