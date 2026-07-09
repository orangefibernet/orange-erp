import { Test, TestingModule } from '@nestjs/testing';
import { RadiusServerService } from './radius-server.service';

describe('RadiusServerService', () => {
  let service: RadiusServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RadiusServerService],
    }).compile();

    service = module.get<RadiusServerService>(RadiusServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
