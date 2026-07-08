import { Test, TestingModule } from '@nestjs/testing';
import { PonPortController } from './pon-port.controller';

describe('PonPortController', () => {
  let controller: PonPortController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PonPortController],
    }).compile();

    controller = module.get<PonPortController>(PonPortController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
