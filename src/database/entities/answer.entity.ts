import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Question } from '@database/entities/question.entity';
import { QuizExecutionResult } from '@database/entities/quiz-execution-result.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'text', type: 'varchar' })
  text: string;

  @Column({ name: 'score', type: 'smallint' })
  score: number;

  @ManyToOne(() => Question, (question) => question.answers, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  question: Question;

  @OneToMany(() => QuizExecutionResult, (quizExecutionResult) => quizExecutionResult.answer, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  quizExecutionResults: QuizExecutionResult[];
}
