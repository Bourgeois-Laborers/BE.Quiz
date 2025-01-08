import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Answer } from '@database/entities/answer.entity';
import { User } from '@database/entities/user.entity';
import { QuizExecution } from '@database/entities/quiz-execution.entity';
import { Question } from '@database/entities/question.entity';

@Entity('quiz_execution_results')
export class QuizExecutionResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.quizExecutionResults, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  user: User;

  @ManyToOne(() => Answer, (answer) => answer.quizExecutionResults, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  answer: Answer;

  @ManyToOne(() => QuizExecution, (quizExecution) => quizExecution.quizExecutionResults, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  quizExecution: QuizExecution;

  @ManyToOne(() => Question, (question) => question.quizExecutionResults, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  question: Question;
}
