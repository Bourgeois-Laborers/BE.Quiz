import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';

import { ControllerComposeDecorator } from '@common/decorators/conroller-compose.decorator';
import { SwaggerRouteComposeDecorator } from '@common/decorators/swagger-route-compose.decorator';
import { User } from '@common/decorators/user.decorator';
import { AuthorizedUser } from '@common/interfaces/user.interface';
import { ApiCreatedResponse, CreatedResponseDto } from '@common/base/dto/created-response.dto';
import { Serialize } from '@common/decorators/serialize.decorator';

import { QuizConfigurationService } from '@quiz-configuration/quiz-configuration.service';
import { CreateQuizConfigurationDto } from '@quiz-configuration/dto/create-quiz-configuration.dto';
import {
  FindOneQuizConfigurationResponse,
  FindOneQuizConfigurationResponseDto,
} from '@quiz-configuration/dto/find-one-quiz-configuration.dto';
import {
  FindAllQuizConfigurationDto,
  FindAllQuizConfigurationResponse,
  FindAllQuizConfigurationResponseDto,
} from '@quiz-configuration/dto/find-all-quiz-configuration.dto';
import {
  RemoveQuizConfigurationResponse,
  RemoveQuizConfigurationResponseDto,
} from '@quiz-configuration/dto/remove-quiz-configuration.dto';

import { QuizConfiguration } from '@database/entities/quiz-configuration.entity';

@Controller('quiz-configuration')
@ControllerComposeDecorator({ guards: ['AuthGuard'] })
export class QuizConfigurationController {
  constructor(private readonly quizConfigurationService: QuizConfigurationService) {}

  @Post()
  @Serialize(CreatedResponseDto)
  @SwaggerRouteComposeDecorator({
    enabledErrorsDisplayResponseVariables: ['NotFound', 'BadRequest', 'Unauthorized'],
    response: { type: ApiCreatedResponse, variable: 'Created' },
  })
  create(
    @Body() createQuizConfigurationDto: CreateQuizConfigurationDto,
    @User() user: AuthorizedUser,
  ): Promise<CreatedResponseDto> {
    return this.quizConfigurationService.create({ body: createQuizConfigurationDto, userId: user.sub });
  }

  @Get()
  @Serialize(FindAllQuizConfigurationResponse)
  @SwaggerRouteComposeDecorator({
    enabledErrorsDisplayResponseVariables: ['NotFound', 'BadRequest', 'Unauthorized'],
    response: { type: FindAllQuizConfigurationResponseDto, variable: 'OK' },
  })
  findAll(@User() user: AuthorizedUser, @Query() query: FindAllQuizConfigurationDto): Promise<QuizConfiguration[]> {
    return this.quizConfigurationService.findAll({ userId: user.sub, ...query });
  }

  @Get(':id')
  @Serialize(FindOneQuizConfigurationResponse)
  @SwaggerRouteComposeDecorator({
    enabledErrorsDisplayResponseVariables: ['NotFound', 'BadRequest', 'Unauthorized'],
    response: { type: FindOneQuizConfigurationResponseDto, variable: 'OK' },
  })
  findOne(@Param('id') id: string, @User() user: AuthorizedUser): Promise<QuizConfiguration> {
    return this.quizConfigurationService.findOne(id, user.sub);
  }

  @Delete(':id')
  @Serialize(RemoveQuizConfigurationResponse)
  @SwaggerRouteComposeDecorator({
    enabledErrorsDisplayResponseVariables: ['NotFound', 'Unauthorized'],
    response: { type: RemoveQuizConfigurationResponseDto, variable: 'OK' },
  })
  remove(@Param('id') id: string, @User() user: AuthorizedUser): Promise<{ result: boolean }> {
    return this.quizConfigurationService.remove(id, user.sub);
  }
}
