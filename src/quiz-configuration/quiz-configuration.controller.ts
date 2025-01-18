import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';

import { ControllerComposeDecorator } from '@common/decorators/conroller-compose.decorator';
import { SwaggerRouteComposeDecorator } from '@common/decorators/swagger-route-compose.decorator';
import { User } from '@common/decorators/user.decorator';
import { AuthorizedUser } from '@common/interfaces/user.interface';
import { ApiCreatedResponse, CreatedResponseDto } from '@common/base/dto/created-response.dto';
import { Serialize } from '@common/decorators/serialize.decorator';

import { QuizConfigurationService } from '@quiz-configuration/quiz-configuration.service';
import { CreateQuizConfigurationDto } from '@quiz-configuration/dto/create-quiz-configuration.dto';

import { FindAllQuizConfigurationDto } from './dto/find-all-quiz-configuration.dto';

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
  @SwaggerRouteComposeDecorator({
    enabledErrorsDisplayResponseVariables: ['NotFound', 'BadRequest', 'Unauthorized'],
    response: { type: ApiCreatedResponse, variable: 'Created' },
  })
  findAll(@User() user: AuthorizedUser, @Query() query: FindAllQuizConfigurationDto) {
    return this.quizConfigurationService.findAll({ userId: user.sub, ...query });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizConfigurationService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizConfigurationService.remove(+id);
  }
}
