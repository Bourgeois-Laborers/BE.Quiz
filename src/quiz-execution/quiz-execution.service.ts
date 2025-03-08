import { Injectable } from '@nestjs/common';
import { CreateQuizExecutionDto } from './dto/create-quiz-execution.dto';
import { UpdateQuizExecutionDto } from './dto/update-quiz-execution.dto';

@Injectable()
export class QuizExecutionService {
  constructor() {}

  create(createQuizExecutionDto: CreateQuizExecutionDto) {
    return createQuizExecutionDto;
  }

  findAll() {
    return `This action returns all quizExecution`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizExecution`;
  }

  update(id: number, updateQuizExecutionDto: UpdateQuizExecutionDto) {
    return updateQuizExecutionDto;
  }

  remove(id: number) {
    return `This action removes a #${id} quizExecution`;
  }
}
