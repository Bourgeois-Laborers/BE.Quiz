import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from 'src/auth/auth.guard';
import { ITokenUser } from 'src/auth/interfaces/auth.interface';
import { User } from 'src/common/decorators/user.decorator';

import {
  CreateQuizConfigurationDto,
  CreateQuizConfigurationResponseDto,
} from '../dtos/create-quiz-configuration.dto';
import { GetQuizConfigurationsDto } from '../dtos/get-quiz-configurations.dto';
import { QuizConfigurationService } from '../services/quiz-configuration.service';

@Controller('quiz-configuration')
@ApiTags('Quiz configuration')
@ApiBearerAuth()
export class QuizConfigurationController {
  constructor(
    private readonly quizConfigurationService: QuizConfigurationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create quiz configuration' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateQuizConfigurationResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard)
  async create(
    @Body() dto: CreateQuizConfigurationDto,
    @User() user: ITokenUser,
  ) {
    return this.quizConfigurationService.create({ ...dto, userId: user.id });
  }

  @Get()
  @ApiOperation({ summary: 'Get all quiz configurations' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved quiz configurations.',
    type: [CreateQuizConfigurationResponseDto],
  })
  @ApiResponse({ status: 404, description: 'No quiz configurations found.' })
  @UseGuards(AuthGuard)
  async getAll(
    @Query() dto: GetQuizConfigurationsDto,
    @User() user: ITokenUser,
  ) {
    return this.quizConfigurationService.getQuizConfigurations({
      ...plainToInstance(GetQuizConfigurationsDto, dto),
      userId: user.id,
    });
  }
}
