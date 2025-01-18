import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { RepositoryBase } from '@common/base/class/repository.base';

import { Privacy, QuizConfiguration } from '@database/entities/quiz-configuration.entity';
import { CreateQuizConfigurationProps } from '@database/repositories/interfaces/create-quiz-configuration';

import { FindAllQuizConfigurationProps } from './interfaces/find-all-quiz-configuration.interface';

export class QuizConfigurationRepository extends RepositoryBase<QuizConfiguration> {
  constructor(
    @InjectRepository(QuizConfiguration)
    private readonly repository: Repository<QuizConfiguration>,
  ) {
    super(repository);
  }

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

  public async findAll({ take, page, userId, privacy }: FindAllQuizConfigurationProps): Promise<QuizConfiguration[]> {
    const where: FindOptionsWhere<QuizConfiguration>[] = [{ createdBy: { id: userId } }];

    if (privacy === Privacy.Public) {
      where.push({ privacy: Privacy.Public });
    }

    return this.paginate({ page, take, where });
  }
}
