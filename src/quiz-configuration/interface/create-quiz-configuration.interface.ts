import { CreateQuizConfigurationDto } from '@quiz-configuration/dto/create-quiz-configuration.dto';

export interface CreateQuizConfigurationProps {
  body: CreateQuizConfigurationDto;
  userId: string;
}
