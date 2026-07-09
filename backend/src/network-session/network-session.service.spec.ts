import { Test, TestingModule } from '@nestjs/testing';
import { NetworkSessionService } from './network-session.service';

describe('NetworkSessionService', () => {
  let service: NetworkSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetworkSessionService],
    }).compile();

    service = module.get<NetworkSessionService>(NetworkSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
