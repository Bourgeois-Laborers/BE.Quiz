import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import {
  CreateQuizConfigurationDto,
  CreateQuizConfigurationResponseDto,
} from '../dtos/create-quiz-configuration.dto';
import { GetQuizConfigurationsDto } from '../dtos/get-quiz-configurations.dto';
import { QuizConfigurationService } from '../services/quiz-configuration.service';

import { User } from '@/modules/auth/decorators/user.decorator';
import { ITokenPayload } from '@/modules/auth/services/interfaces/auth.interface';

@Controller('quiz-configuration')
@ApiTags('Quiz configuration')
export class QuizConfigurationController {
  constructor(
    private readonly quizConfigurationService: QuizConfigurationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create quiz configuration' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateQuizConfigurationResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() dto: CreateQuizConfigurationDto,
    @User() user: ITokenPayload,
  ) {
    return this.quizConfigurationService.create({ ...dto, userId: user.id });
  }

  @Get()
  @ApiOperation({ summary: 'Get all quiz configurations' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved quiz configurations.',
    type: [CreateQuizConfigurationResponseDto],
  })
  @ApiResponse({ status: 404, description: 'No quiz configurations found.' })
  async getAll(
    @Query() dto: GetQuizConfigurationsDto,
    @User() user: ITokenPayload,
  ) {
    return this.quizConfigurationService.getQuizConfigurations({
      ...plainToInstance(GetQuizConfigurationsDto, dto),
      userId: user.id,
    });
  }
}
