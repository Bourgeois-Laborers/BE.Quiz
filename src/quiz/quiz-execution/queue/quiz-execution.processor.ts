import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { QuizExecutionCacheService } from '../cache/cache.service';
import { QueueNames, QuizExecutionJobNames } from '../types/queue.types';
import { IFinishQuestionJob } from './interfaces/job.interfaces';

@Processor(QueueNames.QUIZ_EXECUTION, { concurrency: 50 })
export class QuizExecutionProcessor extends WorkerHost {
  constructor(private readonly cacheService: QuizExecutionCacheService) {
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
    const { questionId, quizExecutionId, sessionId, finishedAt } = data;

    await this.cacheService.finishQuestion({
      questionId,
      quizExecutionId,
      sessionId,
      finishedAt,
    });

    return { success: true };
  }
}
