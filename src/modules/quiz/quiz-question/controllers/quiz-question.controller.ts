import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger';

import { InsertQuestionDto } from '../dtos/insert-question.dto';
import { QuizQuestionService } from '../services/quiz-question.service';

import { User } from '@/modules/auth/decorators/user.decorator';
import { ITokenPayload } from '@/modules/auth/services/interfaces/auth.interface';

@Controller('quiz-configuration')
@ApiTags('Quiz configuration')
export class QuizQuestionController {
  constructor(private readonly quizQuestionService: QuizQuestionService) {}

  @Post(':quizConfigurationId/generate-questions')
  @ApiOperation({ summary: 'Generate and insert questions for a quiz' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({
    status: 201,
    description: 'The questions has been successfully generated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() dto: InsertQuestionDto,
    @User() user: ITokenPayload,
    @Param('quizConfigurationId') quizConfigurationId: string,
  ) {
    return this.quizQuestionService.insertQuestions({
      ...dto,
      userId: user.id,
      quizConfigurationId,
    });
  }
}
