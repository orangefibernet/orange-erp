import { Test, TestingModule } from '@nestjs/testing';
import { ProvisioningLogController } from './provisioning-log.controller';

describe('ProvisioningLogController', () => {
  let controller: ProvisioningLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvisioningLogController],
    }).compile();

    controller = module.get<ProvisioningLogController>(ProvisioningLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
