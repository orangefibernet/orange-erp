import { Test, TestingModule } from '@nestjs/testing';
import { NetworkManagementService } from './network-management.service';

describe('NetworkManagementService', () => {
  let service: NetworkManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetworkManagementService],
    }).compile();

    service = module.get<NetworkManagementService>(NetworkManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
