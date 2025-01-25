import { Pagination } from '@common/base/pagination.base';

import { Privacy } from '@database/entities/quiz-configuration.entity';

export interface FindAllQuizConfigurationProps extends Pagination {
  privacy: Privacy;
  userId: string;
}
