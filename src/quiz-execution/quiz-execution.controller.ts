import { Controller } from '@nestjs/common';

import { QuizExecutionService } from '@quiz-execution/quiz-execution.service';

@Controller('quiz-execution')
export class QuizExecutionController {
  constructor(private readonly quizExecutionService: QuizExecutionService) {}
}
