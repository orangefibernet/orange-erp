import { Test, TestingModule } from '@nestjs/testing';
import { IpGeneratorController } from './ip-generator.controller';

describe('IpGeneratorController', () => {
  let controller: IpGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpGeneratorController],
    }).compile();

    controller = module.get<IpGeneratorController>(IpGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
