import { Test, TestingModule } from '@nestjs/testing';
import { SelfcareController } from './selfcare.controller';

describe('SelfcareController', () => {
  let controller: SelfcareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelfcareController],
    }).compile();

    controller = module.get<SelfcareController>(SelfcareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
