import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SetQuizExecutionResultAnswerDto } from '../dtos/set-answer.dto';
import { QuizExecutionResultService } from '../services/quiz-execution-result.service';

import { User } from '@/modules/auth/decorators/user.decorator';
import { ITokenPayload } from '@/modules/auth/services/interfaces/auth.interface';

@Controller('session/:sessionId/quiz-execution-result')
@ApiTags('Quiz execution result')
export class QuizExecutionResultController {
  constructor(
    private readonly quizExecutionResultService: QuizExecutionResultService,
  ) {}

  @Put(':quizExecutionId/answer')
  async setAnswer(
    @Param('quizExecutionId') quizExecutionId: string,
    @Param('sessionId') sessionId: string,
    @User() { id: userId }: ITokenPayload,
    @Body() { answerId, questionId }: SetQuizExecutionResultAnswerDto,
  ) {
    return this.quizExecutionResultService.setAnswer({
      answerId,
      questionId,
      quizExecutionId,
      userId,
      sessionId,
    });
  }
}
