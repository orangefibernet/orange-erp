import { Test, TestingModule } from '@nestjs/testing';
import { IpAllocationService } from './ip-allocation.service';

describe('IpAllocationService', () => {
  let service: IpAllocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpAllocationService],
    }).compile();

    service = module.get<IpAllocationService>(IpAllocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
