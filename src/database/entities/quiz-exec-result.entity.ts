import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Answer } from '@database/entities/answer.entity';
import { User } from '@database/entities/user.entity';
import { QuizExec } from '@database/entities/quiz-exec.entity';
import { Question } from '@database/entities/question.entity';

@Entity('quizzes_exec_result')
export class QuizExecResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.quizExecResult, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  user: User;

  @ManyToOne(() => Answer, (answer) => answer.quizExecResult, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  answer: Answer;

  @ManyToOne(() => QuizExec, (quizExec) => quizExec.quizExecResult, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  quizExec: QuizExec;

  @ManyToOne(() => Question, (question) => question.quizExecResult, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  question: Question;
}
