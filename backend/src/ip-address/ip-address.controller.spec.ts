import { Test, TestingModule } from '@nestjs/testing';
import { IpAddressController } from './ip-address.controller';

describe('IpAddressController', () => {
  let controller: IpAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpAddressController],
    }).compile();

    controller = module.get<IpAddressController>(IpAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
