import { Test, TestingModule } from '@nestjs/testing';
import { RadiusProvisionController } from './radius-provision.controller';

describe('RadiusProvisionController', () => {
  let controller: RadiusProvisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadiusProvisionController],
    }).compile();

    controller = module.get<RadiusProvisionController>(RadiusProvisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
