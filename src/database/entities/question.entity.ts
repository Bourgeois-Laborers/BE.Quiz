import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { NumericTransformer } from '@common/utils/numeric-transformer';

import { QuizConfig } from '@database/entities/quiz-config.entity';
import { Answer } from '@database/entities/answer.entity';
import { QuizExecResult } from '@database/entities/quiz-exec-result.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'complexity', type: 'numeric', precision: 3, scale: 3, transformer: new NumericTransformer() })
  complexity: string;

  @Column({ name: 'text', type: 'varchar' })
  text: string;

  @ManyToOne(() => QuizConfig, (quizConfig) => quizConfig.quizzesExec, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  quizConfig: QuizConfig;

  @OneToMany(() => Answer, (answer) => answer.question, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  answers: Answer[];

  @OneToMany(() => QuizExecResult, (quizExecResult) => quizExecResult.question, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  quizExecResult: QuizExecResult[];
}
