import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuizConfiguration } from '@database/entities/quiz-configuration.entity';
import { CreateQuizConfigurationProps } from '@database/repositories/interfaces/create-quiz-configuration';

export class QuizConfigurationRepository {
  constructor(
    @InjectRepository(QuizConfiguration)
    private readonly repository: Repository<QuizConfiguration>,
  ) {}

  public async create({
    name,
    privacy,
    prompt,
    questionsCount,
    userId,
  }: CreateQuizConfigurationProps): Promise<QuizConfiguration> {
    return this.repository.save({
      name,
      privacy,
      prompt,
      questionsCount,
      createdBy: {
        id: userId,
      },
    });
  }
}
