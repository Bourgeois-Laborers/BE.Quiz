import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Question } from '@database/entities/question.entity';
import { QuizExecResult } from '@database/entities/quiz-exec-result.entity';

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

  @OneToMany(() => QuizExecResult, (quizExecResult) => quizExecResult.answer, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  quizExecResult: QuizExecResult[];
}
