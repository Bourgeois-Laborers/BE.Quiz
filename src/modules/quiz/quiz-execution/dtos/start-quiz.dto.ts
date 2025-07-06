import { QuizExecutionStatus } from '@app/prisma';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, Min } from 'class-validator';

import { IStartResult } from '../services/interfaces/quiz-execution.service.interface';

export class StartQuizDto {
  @ApiProperty({ description: 'Time in seconds' })
  @Min(10)
  timePerQuestion: number;

  @ApiProperty({
    default: false,
    description: 'Whether to share answers with other users',
  })
  @IsBoolean()
  shareAnswers: boolean;
}

export class StartQuizResultDto implements IStartResult {
  @ApiProperty({ description: 'Unique identifier for the quiz execution' })
  quizExecutionId: string;

  @ApiProperty({
    description: 'Current status of the quiz execution',
    enum: QuizExecutionStatus,
  })
  status: QuizExecutionStatus;

  @ApiProperty({
    default: false,
    description: 'Whether answers are shared with other users',
  })
  shareAnswers: boolean;

  @ApiProperty({ description: 'Time allocated per question in seconds' })
  timePerQuestion: number;
}
