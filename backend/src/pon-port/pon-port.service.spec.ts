import { Test, TestingModule } from '@nestjs/testing';
import { PonPortService } from './pon-port.service';

describe('PonPortService', () => {
  let service: PonPortService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PonPortService],
    }).compile();

    service = module.get<PonPortService>(PonPortService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
