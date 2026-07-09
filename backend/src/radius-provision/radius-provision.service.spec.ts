import { Test, TestingModule } from '@nestjs/testing';
import { RadiusProvisionService } from './radius-provision.service';

describe('RadiusProvisionService', () => {
  let service: RadiusProvisionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RadiusProvisionService],
    }).compile();

    service = module.get<RadiusProvisionService>(RadiusProvisionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
