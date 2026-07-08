import { Test, TestingModule } from '@nestjs/testing';
import { OnuController } from './onu.controller';

describe('OnuController', () => {
  let controller: OnuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnuController],
    }).compile();

    controller = module.get<OnuController>(OnuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
