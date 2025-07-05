import { ITokenUser } from '@auth/interfaces/auth.interface';
import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';

import { SetQuizExecutionResultAnswerDto } from '../dtos/set-answer.dto';
import { QuizExecutionResultService } from '../services/quiz-execution-result.service';

@Controller('session/:sessionId/quiz-execution-result')
@ApiTags('Quiz execution result')
@ApiBearerAuth()
export class QuizExecutionResultController {
  constructor(
    private readonly quizExecutionResultService: QuizExecutionResultService,
  ) {}

  @Put(':quizExecutionId/answer')
  async setAnswer(
    @Param('quizExecutionId') quizExecutionId: string,
    @Param('sessionId') sessionId: string,
    @User() { id: userId }: ITokenUser,
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
