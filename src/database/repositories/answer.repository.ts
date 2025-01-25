import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAnswersProps } from '@database/repositories/interfaces/create-answers.interface';
import { Answer } from '@database/entities/answer.entity';

export class AnswerRepository {
  constructor(
    @InjectRepository(Answer)
    private readonly repository: Repository<Answer>,
  ) {}

  public async createMany({ answers }: CreateAnswersProps): Promise<Answer[]> {
    return this.repository.save(
      answers.map(({ questionId, score, text }) => ({ score, text, question: { id: questionId } })),
    );
  }
}
