import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { StartQuestionResultDto } from '../dtos/start-question.dto';
import { StartQuizDto, StartQuizResultDto } from '../dtos/start-quiz.dto';
import { QuizExecutionService } from '../services/quiz-execution.service';

import { User } from '@/modules/auth/decorators/user.decorator';
import { AuthGuard } from '@/modules/auth/guards/auth.guard';
import { ITokenUser } from '@/modules/auth/interfaces/token-user.interface';

@Controller('session/:sessionId/quiz-execution')
@ApiTags('Quiz execution')
@ApiBearerAuth()
export class QuizExecutionController {
  constructor(private readonly quizExecutionService: QuizExecutionService) {}

  @Post(':quizConfigurationId/start-quiz')
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'Quiz started successfully.',
    type: StartQuizResultDto,
  })
  async startQuiz(
    @Param('quizConfigurationId') quizConfigurationId: string,
    @Param('sessionId') sessionId: string,
    @User() { id: userId }: ITokenUser,
    @Body() { shareAnswers, timePerQuestion }: StartQuizDto,
  ): Promise<StartQuizResultDto> {
    return this.quizExecutionService.start({
      userId,
      sessionId,
      quizConfigurationId,
      shareAnswers,
      timePerQuestion,
    });
  }

  @Post(':quizExecutionId/start-question')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'Question started successfully.',
    type: StartQuestionResultDto,
  })
  async startQuestion(
    @Param('quizExecutionId') quizExecutionId: string,
    @Param('sessionId') sessionId: string,
    @User() { id: userId }: ITokenUser,
  ): Promise<StartQuestionResultDto> {
    return this.quizExecutionService.startQuestion({
      quizExecutionId,
      userId,
      sessionId,
    });
  }

  @Put(':quizExecutionId/finish')
  @UseGuards(AuthGuard)
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

  @Get(':quizExecutionId/question')
  @UseGuards(AuthGuard)
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
