import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { QuizExec } from '@database/entities/quiz-exec.entity';
import { Question } from '@database/entities/question.entity';

@Entity('quizzes_config')
export class QuizConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 80 })
  name: string;

  @Column({ name: 'prompt', type: 'varchar' })
  prompt: string;

  @Column({ name: 'questions_count', type: 'smallint' })
  questionsCount: number;

  @OneToMany(() => QuizExec, (quizExec) => quizExec.quizConfig, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    nullable: true,
  })
  quizzesExec: QuizExec[];

  @OneToMany(() => Question, (question) => question.quizConfig, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  questions: Question[];
}
