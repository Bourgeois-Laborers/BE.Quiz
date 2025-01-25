import { Test, TestingModule } from '@nestjs/testing';
import { QuizExecutionService } from '@quiz-execution/quiz-execution.service';

describe('QuizExecutionService', () => {
  let service: QuizExecutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizExecutionService],
    }).compile();

    service = module.get<QuizExecutionService>(QuizExecutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
