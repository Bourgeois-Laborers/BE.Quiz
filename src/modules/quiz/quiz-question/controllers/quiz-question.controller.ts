import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { InsertQuestionDto } from '../dtos/insert-question.dto';
import { QuizQuestionService } from '../services/quiz-question.service';

import { User } from '@/modules/auth/decorators/user.decorator';
import { AuthGuard } from '@/modules/auth/guards/auth.guard';
import { ITokenUser } from '@/modules/auth/interfaces/token-user.interface';

@Controller('quiz-configuration')
@ApiTags('Quiz configuration')
@ApiBearerAuth()
export class QuizQuestionController {
  constructor(private readonly quizQuestionService: QuizQuestionService) {}

  @Post(':quizConfigurationId/generate-questions')
  @ApiOperation({ summary: 'Generate and insert questions for a quiz' })
  @ApiResponse({
    status: 201,
    description: 'The questions has been successfully generated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard)
  async create(
    @Body() dto: InsertQuestionDto,
    @User() user: ITokenUser,
    @Param('quizConfigurationId') quizConfigurationId: string,
  ) {
    return this.quizQuestionService.insertQuestions({
      ...dto,
      userId: user.id,
      quizConfigurationId,
    });
  }
}
