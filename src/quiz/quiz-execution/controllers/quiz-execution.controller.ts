import { QuizExecutionStatus } from '@app/prisma';
import { AuthGuard } from '@auth/auth.guard';
import { ITokenUser } from '@auth/interfaces/auth.interface';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';

import { StartQuizDto, StartQuizResultDto } from '../dtos/start-quiz.dto';
import { QuizExecutionService } from '../services/quiz-execution.service';

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
  })
  async startQuestion(
    @Param('quizExecutionId') quizExecutionId: string,
    @Param('sessionId') sessionId: string,
    @User() { id: userId }: ITokenUser,
  ): Promise<void> {
    await this.quizExecutionService.startQuestion({
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

  @Put(':quizExecutionId/status')
  @UseGuards(AuthGuard)
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
    @User() { id: userId }: ITokenUser,
    @Query('status') status: QuizExecutionStatus,
  ) {
    return this.quizExecutionService.updateQuizExecutionStatus(
      quizExecutionId,
      status,
      userId,
    );
  }
}
