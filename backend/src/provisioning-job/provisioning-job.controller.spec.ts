import { Test, TestingModule } from '@nestjs/testing';
import { ProvisioningJobController } from './provisioning-job.controller';

describe('ProvisioningJobController', () => {
  let controller: ProvisioningJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvisioningJobController],
    }).compile();

    controller = module.get<ProvisioningJobController>(ProvisioningJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
