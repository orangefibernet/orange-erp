import { Injectable } from '@nestjs/common';
import { ProvisionCustomerDto } from './dto/provision-customer.dto';

@Injectable()
export class ProvisioningService {
  async provision(dto: ProvisionCustomerDto) {
    // Phase 1
    // Validation only

    return {
      success: true,
      message: 'Provisioning workflow initialized.',
      data: {
        customerId: dto.customerId,
        subscriptionId: dto.subscriptionId,
        onuId: dto.onuId,
      },
    };
  }
}