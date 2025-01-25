import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { QuizExecution } from '@database/entities/quiz-execution.entity';
import { Question } from '@database/entities/question.entity';
import { User } from '@database/entities/user.entity';

export enum Privacy {
  Public = 'public',
  Private = 'private',
}

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

  @Column({ name: 'privacy', enum: Privacy })
  privacy: Privacy;

  @ManyToOne(() => User, (user) => user.quizConfigurations)
  createdBy: User;

  @OneToMany(() => QuizExecution, (quizExecution) => quizExecution.quizConfiguration, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    nullable: true,
  })
  quizExecutions: QuizExecution[];

  @OneToMany(() => Question, (question) => question.quizConfiguration, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  questions: Question[];
}
