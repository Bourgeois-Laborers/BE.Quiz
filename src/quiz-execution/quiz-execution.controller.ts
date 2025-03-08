import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizExecutionService } from './quiz-execution.service';
import { CreateQuizExecutionDto } from './dto/create-quiz-execution.dto';
import { UpdateQuizExecutionDto } from './dto/update-quiz-execution.dto';

@Controller('quiz-execution')
export class QuizExecutionController {
  constructor(private readonly quizExecutionService: QuizExecutionService) {}

  @Post()
  create(@Body() createQuizExecutionDto: CreateQuizExecutionDto) {
    return this.quizExecutionService.create(createQuizExecutionDto);
  }

  @Get()
  findAll() {
    return this.quizExecutionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizExecutionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizExecutionDto: UpdateQuizExecutionDto) {
    return this.quizExecutionService.update(+id, updateQuizExecutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizExecutionService.remove(+id);
  }
}
