import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { IAnswer } from '../repositories/interfaces/answer.repository.interfaces';
import { IQuestion } from '../repositories/interfaces/question.repository.interface';

export class QuestionDto implements IQuestion {
  @ApiProperty()
  @Expose()
  complexity: string;

  @ApiProperty()
  @Expose()
  question: string;

  @Exclude()
  answers?: IAnswer[] | undefined;

  @ApiProperty({ type: [String] })
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  quizConfigurationId: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
