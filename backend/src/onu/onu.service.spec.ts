import { Test, TestingModule } from '@nestjs/testing';
import { OnuService } from './onu.service';

describe('OnuService', () => {
  let service: OnuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnuService],
    }).compile();

    service = module.get<OnuService>(OnuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
