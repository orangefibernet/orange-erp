import { Test, TestingModule } from '@nestjs/testing';
import { BillingSchedulerService } from './billing-scheduler.service';

describe('BillingSchedulerService', () => {
  let service: BillingSchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillingSchedulerService],
    }).compile();

    service = module.get<BillingSchedulerService>(BillingSchedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
