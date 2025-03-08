import { PartialType } from '@nestjs/swagger';
import { CreateQuizExecutionDto } from './create-quiz-execution.dto';

export class UpdateQuizExecutionDto extends PartialType(CreateQuizExecutionDto) {}
