import { Test, TestingModule } from '@nestjs/testing';

import { QuizConfigurationService } from '@quiz-configuration/quiz-configuration.service';

describe('QuizConfigurationService', () => {
  let service: QuizConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizConfigurationService],
    }).compile();

    service = module.get<QuizConfigurationService>(QuizConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
