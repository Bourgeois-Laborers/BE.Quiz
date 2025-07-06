import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SetQuizExecutionResultAnswerDto } from '../dtos/set-answer.dto';
import { QuizExecutionResultService } from '../services/quiz-execution-result.service';

import { User } from '@/modules/auth/decorators/user.decorator';
import { AuthGuard } from '@/modules/auth/guards/auth.guard';
import { ITokenUser } from '@/modules/auth/interfaces/token-user.interface';

@Controller('session/:sessionId/quiz-execution-result')
@ApiTags('Quiz execution result')
@ApiBearerAuth()
export class QuizExecutionResultController {
  constructor(
    private readonly quizExecutionResultService: QuizExecutionResultService,
  ) {}

  @Put(':quizExecutionId/answer')
  @UseGuards(AuthGuard)
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
