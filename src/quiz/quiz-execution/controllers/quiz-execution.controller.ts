import { Controller, Post, Put } from '@nestjs/common';

@Controller()
export class QuizExecutionController {
  constructor() {}

  @Post('start-quiz')
  async startQuiz() {}

  @Put('set-answer')
  async setAnswer() {}

  @Put('finish-answer')
  async finishAnswer() {}

  @Put('finish-quiz')
  async finishQuiz () {}
}
