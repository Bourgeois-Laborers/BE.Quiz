import { ITokenUser } from '@auth/interfaces/auth.interface';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';

import { StartQuizDto } from '../dtos/start-quiz.dto';
import { QuizExecutionService } from '../services/quiz-execution.service';

@Controller('session/:sessionId/quiz-execution')
@ApiTags('Quiz execution')
@ApiBearerAuth()
export class QuizExecutionController {
  constructor(private readonly quizExecutionService: QuizExecutionService) {}

  @Post(':quizConfigurationId/start-quiz')
  async startQuiz(
    @Param('quizConfigurationId') quizConfigurationId: string,
    @Param('sessionId') sessionId: string,
    @User() { id: userId }: ITokenUser,
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
    @Param('sessionId') sessionId: string,
    @User() { id: userId }: ITokenUser,
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
    @Param('sessionId') sessionId: string,
    @User() { id: userId }: ITokenUser,
  ) {
    return this.quizExecutionService.finishQuiz({
      quizExecutionId,
      userId,
      sessionId,
    });
  }

  @Get(':quizExecutionId/current-question')
  async getCurrentQuestion(
    @Param('quizExecutionId') quizExecutionId: string,
    @Param('sessionId') sessionId: string,
    @User() { id: userId }: ITokenUser,
  ) {
    return this.quizExecutionService.getCurrentQuestion({
      quizExecutionId,
      userId,
      sessionId,
    });
  }
}
