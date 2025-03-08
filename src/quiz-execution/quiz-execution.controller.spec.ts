import { Test, TestingModule } from '@nestjs/testing';
import { QuizExecutionController } from './quiz-execution.controller';
import { QuizExecutionService } from './quiz-execution.service';

describe('QuizExecutionController', () => {
  let controller: QuizExecutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizExecutionController],
      providers: [QuizExecutionService],
    }).compile();

    controller = module.get<QuizExecutionController>(QuizExecutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
