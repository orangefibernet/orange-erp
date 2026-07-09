import { Test, TestingModule } from '@nestjs/testing';
import { ProvisioningQueueService } from './provisioning-queue.service';

describe('ProvisioningQueueService', () => {
  let service: ProvisioningQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvisioningQueueService],
    }).compile();

    service = module.get<ProvisioningQueueService>(ProvisioningQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
