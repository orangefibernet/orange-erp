import { Test, TestingModule } from '@nestjs/testing';
import { NetworkMonitorController } from './network-monitor.controller';

describe('NetworkMonitorController', () => {
  let controller: NetworkMonitorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NetworkMonitorController],
    }).compile();

    controller = module.get<NetworkMonitorController>(NetworkMonitorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
