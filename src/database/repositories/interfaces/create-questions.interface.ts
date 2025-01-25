import { Question } from '@database/entities/question.entity';

export interface CreateQuestionsProps {
  questions: Pick<Question, 'complexity' | 'text' | 'quizConfiguration' | 'id'>[];
}
