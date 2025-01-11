import { Privacy } from '@database/entities/quiz-configuration.entity';

export interface CreateQuizConfigurationProps {
  privacy: Privacy;
  questionsCount: number;
  prompt: string;
  userId: string;
  name: string;
}
