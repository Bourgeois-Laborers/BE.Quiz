import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizExecutionService {
  create() {
    return 'This action adds a new quizConfiguration';
  }

  findAll() {
    return `This action returns all quizConfiguration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizConfiguration`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizConfiguration`;
  }
}
