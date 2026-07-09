import { Test, TestingModule } from '@nestjs/testing';
import { ProvisioningJobService } from './provisioning-job.service';

describe('ProvisioningJobService', () => {
  let service: ProvisioningJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvisioningJobService],
    }).compile();

    service = module.get<ProvisioningJobService>(ProvisioningJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
