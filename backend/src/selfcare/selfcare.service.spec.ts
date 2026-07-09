import { Test, TestingModule } from '@nestjs/testing';
import { SelfcareService } from './selfcare.service';

describe('SelfcareService', () => {
  let service: SelfcareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelfcareService],
    }).compile();

    service = module.get<SelfcareService>(SelfcareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
