export class CreateProvisioningJobDto {
  queueJobId?: string;

  connectionId: string;

  action: string;

  status: string;

  payload?: any;
}