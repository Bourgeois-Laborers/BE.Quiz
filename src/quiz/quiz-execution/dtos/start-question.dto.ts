import { ApiProperty } from '@nestjs/swagger';
import { QuestionDto } from '@quiz/quiz-question/dtos/question.dto';
import { Exclude, Expose } from 'class-transformer';

export class StartQuestionResultDto {
  @ApiProperty({ type: QuestionDto })
  @Expose()
  question: QuestionDto;

  @ApiProperty()
  @Exclude()
  startedAt: Date;

  @ApiProperty()
  @Expose()
  finishedAt: Date;
}
