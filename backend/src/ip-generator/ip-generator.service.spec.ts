import { Test, TestingModule } from '@nestjs/testing';
import { IpGeneratorService } from './ip-generator.service';

describe('IpGeneratorService', () => {
  let service: IpGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpGeneratorService],
    }).compile();

    service = module.get<IpGeneratorService>(IpGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
