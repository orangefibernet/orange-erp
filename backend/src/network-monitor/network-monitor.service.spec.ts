import { Test, TestingModule } from '@nestjs/testing';
import { NetworkMonitorService } from './network-monitor.service';

describe('NetworkMonitorService', () => {
  let service: NetworkMonitorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetworkMonitorService],
    }).compile();

    service = module.get<NetworkMonitorService>(NetworkMonitorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
