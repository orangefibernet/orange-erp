import { Test, TestingModule } from '@nestjs/testing';
import { OltController } from './olt.controller';

describe('OltController', () => {
  let controller: OltController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OltController],
    }).compile();

    controller = module.get<OltController>(OltController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
