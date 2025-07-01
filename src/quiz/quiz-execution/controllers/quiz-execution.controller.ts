import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { QuizExecutionService } from '../services/quiz-execution.service';
import { StartQuizDto } from '../dtos/start-quiz.dto';
import { ITokenUser } from '@auth/interfaces/auth.interface';
import { User } from 'src/common/decorators/user.decorator';

@Controller()
export class QuizExecutionController {
  constructor(private readonly quizExecutionService: QuizExecutionService) {}

  @Post(':quizConfigurationId/start-quiz')
  async startQuiz(
    @Param('quizConfigurationId') quizConfigurationId: string,
    @User() { id: userId, sessionId }: ITokenUser,
    @Body() { shareAnswers, timePerQuestion }: StartQuizDto,
  ) {
    return this.quizExecutionService.start({
      userId,
      sessionId,
      quizConfigurationId,
      shareAnswers,
      timePerQuestion,
    });
  }

  @Post(':quizExecutionId/start-question')
  async startQuestion(
    @Param('quizExecutionId') quizExecutionId: string,
    @User() { id: userId, sessionId }: ITokenUser,
  ) {
    return this.quizExecutionService.startQuestion({
      quizExecutionId,
      userId,
      sessionId,
    });
  }

  @Put(':quizExecutionId/finish-quiz')
  async finishQuiz(
    @Param('quizExecutionId') quizExecutionId: string,
    @User() { id: userId, sessionId }: ITokenUser,
  ) {
    return this.quizExecutionService.finishQuiz({
      quizExecutionId,
      userId,
      sessionId,
    });
  }
}
