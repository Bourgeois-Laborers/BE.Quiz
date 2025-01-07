import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { QuizConfiguration } from '@database/entities/quiz-configuration.entity';
import { QuizExecutionResult } from '@database/entities/quiz-execution-result.entity';

@Entity('quiz_executions')
export class QuizExecution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'time_per_question', type: 'int2' })
  timePerQuestion: number;

  @Column({ name: 'share_answers', type: 'boolean' })
  shareAnswers: boolean;

  @ManyToOne(() => QuizConfiguration, (quizConfiguration) => quizConfiguration.quizExecutions, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  quizConfiguration: QuizConfiguration;

  @OneToMany(() => QuizExecutionResult, (quizExecutionResult) => quizExecutionResult.quizExecution)
  quizExecutionResults: QuizExecutionResult[];
}
