import { Test, TestingModule } from '@nestjs/testing';
import { RadiusServerController } from './radius-server.controller';

describe('RadiusServerController', () => {
  let controller: RadiusServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadiusServerController],
    }).compile();

    controller = module.get<RadiusServerController>(RadiusServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
