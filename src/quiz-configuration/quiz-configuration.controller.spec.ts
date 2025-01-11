import { Test, TestingModule } from '@nestjs/testing';

import { QuizConfigurationController } from '@quiz-configuration/quiz-configuration.controller';
import { QuizConfigurationService } from '@quiz-configuration/quiz-configuration.service';

describe('QuizConfigurationController', () => {
  let controller: QuizConfigurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizConfigurationController],
      providers: [QuizConfigurationService],
    }).compile();

    controller = module.get<QuizConfigurationController>(QuizConfigurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
