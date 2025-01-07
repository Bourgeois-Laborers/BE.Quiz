import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { NumericTransformer } from '@common/utils/numeric-transformer';

import { QuizConfiguration } from '@database/entities/quiz-configuration.entity';
import { Answer } from '@database/entities/answer.entity';
import { QuizExecutionResult } from '@database/entities/quiz-execution-result.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'complexity', type: 'numeric', precision: 3, scale: 3, transformer: new NumericTransformer() })
  complexity: string;

  @Column({ name: 'text', type: 'varchar' })
  text: string;

  @ManyToOne(() => QuizConfiguration, (quizConfiguration) => quizConfiguration.quizExecutions, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  quizConfiguration: QuizConfiguration;

  @OneToMany(() => Answer, (answer) => answer.question, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  answers: Answer[];

  @OneToMany(() => QuizExecutionResult, (quizExecutionResult) => quizExecutionResult.question, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  quizExecutionResults: QuizExecutionResult[];
}
