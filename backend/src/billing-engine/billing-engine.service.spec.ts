import { Test, TestingModule } from '@nestjs/testing';
import { BillingEngineService } from './billing-engine.service';

describe('BillingEngineService', () => {
  let service: BillingEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillingEngineService],
    }).compile();

    service = module.get<BillingEngineService>(BillingEngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
