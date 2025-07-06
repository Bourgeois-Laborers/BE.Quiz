import { QuizExecutionStatus } from '@app/prisma';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

import { QuizExecutionCacheService } from '../cache/cache.service';
import { QueueNames, QuizExecutionJobNames } from '../types/queue.types';
import { IFinishQuestionJob } from './interfaces/job.interfaces';
import { QuizExecutionService } from '../services/quiz-execution.service';

@Processor(QueueNames.QUIZ_EXECUTION, { concurrency: 50 })
export class QuizExecutionProcessor extends WorkerHost {
  private readonly logger = new Logger(QuizExecutionProcessor.name);

  constructor(
    private readonly cacheService: QuizExecutionCacheService,
    private readonly quizExecutionService: QuizExecutionService,
  ) {
    super();
  }

  async process(job: Job) {
    switch (job.name as QuizExecutionJobNames) {
      case QuizExecutionJobNames.FINISH_QUESTION:
        await this.finishQuestion(job as Job<IFinishQuestionJob>);
        break;
    }
  }

  async finishQuestion({ data }: Job<IFinishQuestionJob>) {
    this.logger.log(
      `Processing job: ${QuizExecutionJobNames.FINISH_QUESTION}`,
      data,
    );

    const { questionId, quizExecutionId, sessionId, finishedAt, isLast } = data;

    await this.cacheService.finishQuestion({
      questionId,
      quizExecutionId,
      sessionId,
      finishedAt,
    });

    if (isLast) {
      await Promise.all([
        this.cacheService.finishQuiz(sessionId, quizExecutionId),
        this.quizExecutionService.updateQuizExecutionStatus(
          quizExecutionId,
          QuizExecutionStatus.COMPLETED,
        ),
      ]);
    }

    this.logger.log(
      `Finished processing job: ${QuizExecutionJobNames.FINISH_QUESTION}`,
      data,
    );

    return { success: true };
  }
}
