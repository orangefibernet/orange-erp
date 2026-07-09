import { Test, TestingModule } from '@nestjs/testing';
import { IpPoolService } from './ip-pool.service';

describe('IpPoolService', () => {
  let service: IpPoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpPoolService],
    }).compile();

    service = module.get<IpPoolService>(IpPoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
