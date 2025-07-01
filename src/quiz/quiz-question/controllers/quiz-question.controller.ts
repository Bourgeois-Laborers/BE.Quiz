import { AuthGuard } from '@auth/auth.guard';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ITokenUser } from 'src/auth/interfaces/auth.interface';
import { User } from 'src/common/decorators/user.decorator';

import { InsertQuestionDto } from '../dtos/insert-question.dto';
import { QuizQuestionService } from '../services/quiz-question.service';

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
