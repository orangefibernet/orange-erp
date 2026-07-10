import {
  Connection,
  Customer,
  Subscription,
  Package,
  Nas,
  Onu,
  IpAddress,
} from '@prisma/client';

export interface ProvisioningContext {
  connection: Connection;

  customer: Customer;

  subscription: Subscription;

  package: Package;

  nas: Nas | null;

  onu: Onu | null;

  allocatedIp: IpAddress | null;
}