import { QuizExecutionStatus } from '@app/prisma';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiCookieAuth,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { StartQuizDto, StartQuizResultDto } from '../dtos/start-quiz.dto';
import { QuizExecutionService } from '../services/quiz-execution.service';

import { User } from '@/modules/auth/decorators/user.decorator';
import { ITokenPayload } from '@/modules/auth/services/interfaces/auth.interface';

@Controller('session/:sessionId/quiz-execution')
@ApiTags('Quiz execution')
export class QuizExecutionController {
  constructor(private readonly quizExecutionService: QuizExecutionService) {}

  @Post(':quizConfigurationId/start-quiz')
  @ApiCookieAuth('accessToken')
  @ApiCreatedResponse({
    description: 'Quiz started successfully.',
    type: StartQuizResultDto,
  })
  async startQuiz(
    @Param('quizConfigurationId') quizConfigurationId: string,
    @Param('sessionId') sessionId: string,
    @User() { id: userId }: ITokenPayload,
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
  @ApiCreatedResponse({
    description: 'Question started successfully.',
  })
  async startQuestion(
    @Param('quizExecutionId') quizExecutionId: string,
    @Param('sessionId') sessionId: string,
    @User() { id: userId }: ITokenPayload,
  ): Promise<void> {
    await this.quizExecutionService.startQuestion({
      quizExecutionId,
      userId,
      sessionId,
    });
  }

  @Get(':quizExecutionId/question')
  async getCurrentQuestion(
    @Param('quizExecutionId') quizExecutionId: string,
    @Param('sessionId') sessionId: string,
    @User() { id: userId }: ITokenPayload,
  ) {
    return this.quizExecutionService.getCurrentQuestion({
      quizExecutionId,
      userId,
      sessionId,
    });
  }

  @Put(':quizExecutionId/status')
  @ApiCreatedResponse({
    description: 'Quiz execution status updated successfully.',
  })
  @ApiQuery({
    name: 'status',
    required: true,
    enum: QuizExecutionStatus,
  })
  async updateQuizExecutionStatus(
    @Param('quizExecutionId') quizExecutionId: string,
    @User() { id: userId }: ITokenPayload,
    @Query('status') status: QuizExecutionStatus,
  ) {
    return this.quizExecutionService.updateQuizExecutionStatus(
      quizExecutionId,
      status,
      userId,
    );
  }
}
