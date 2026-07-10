import { Test, TestingModule } from '@nestjs/testing';
import { NetworkManagementController } from './network-management.controller';

describe('NetworkManagementController', () => {
  let controller: NetworkManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NetworkManagementController],
    }).compile();

    controller = module.get<NetworkManagementController>(NetworkManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
