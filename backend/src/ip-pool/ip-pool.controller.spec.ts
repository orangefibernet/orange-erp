import { Test, TestingModule } from '@nestjs/testing';
import { IpPoolController } from './ip-pool.controller';

describe('IpPoolController', () => {
  let controller: IpPoolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpPoolController],
    }).compile();

    controller = module.get<IpPoolController>(IpPoolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
