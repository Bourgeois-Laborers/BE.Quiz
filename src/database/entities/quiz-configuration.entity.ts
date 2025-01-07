import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { QuizExecution } from '@database/entities/quiz-execution.entity';
import { Question } from '@database/entities/question.entity';

@Entity('quiz_configurations')
export class QuizConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 80 })
  name: string;

  @Column({ name: 'prompt', type: 'varchar' })
  prompt: string;

  @Column({ name: 'questions_count', type: 'smallint' })
  questionsCount: number;

  @OneToMany(() => QuizExecution, (quizExecution) => quizExecution.quizConfiguration, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    nullable: true,
  })
  quizExecutions: QuizExecution[];

  @OneToMany(() => Question, (question) => question.quizConfiguration, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  questions: Question[];
}
