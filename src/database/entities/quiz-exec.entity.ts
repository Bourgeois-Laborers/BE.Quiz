import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { QuizConfig } from '@database/entities/quiz-config.entity';
import { QuizExecResult } from '@database/entities/quiz-exec-result.entity';

@Entity('quizzes_exec')
export class QuizExec {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'time_per_question', type: 'int2' })
  timePerQuestion: number;

  @Column({ name: 'share_answers', type: 'boolean' })
  shareAnswers: boolean;

  @ManyToOne(() => QuizConfig, (quizConfig) => quizConfig.quizzesExec, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  quizConfig: QuizConfig;

  @OneToMany(() => QuizExecResult, (quizExecResult) => quizExecResult.quizExec)
  quizExecResult: QuizExecResult[];
}
