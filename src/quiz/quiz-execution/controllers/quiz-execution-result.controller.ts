import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuizExecutionResultService } from '../services/quiz-execution-result.service';
import { ITokenUser } from '@auth/interfaces/auth.interface';
import { User } from 'src/common/decorators/user.decorator';
import { SetQuizExecutionResultAnswerDto } from '../dtos/set-answer.dto';

@Controller()
@ApiTags('Quiz execution result')
export class QuizExecutionResultController {
  constructor(
    private readonly quizExecutionResultService: QuizExecutionResultService,
  ) {}

  @Put(':quizExecutionId/set-answer')
  async setAnswer(
    @Param('quizExecutionId') quizExecutionId: string,
    @User() { id: userId, sessionId }: ITokenUser,
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
