import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Question } from '@database/entities/question.entity';
import { CreateQuestionsProps } from '@database/repositories/interfaces/create-questions.interface';

export class QuestionRepository {
  constructor(
    @InjectRepository(Question)
    private readonly repository: Repository<Question>,
  ) {}

  public async createMany({ questions }: CreateQuestionsProps): Promise<Question[]> {
    return this.repository.save(questions);
  }
}
