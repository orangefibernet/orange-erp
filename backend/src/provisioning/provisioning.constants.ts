export const PROVISIONING_QUEUE = 'provisioning';

export enum ProvisioningJob {
  ACTIVATE = 'activate',
  SUSPEND = 'suspend',
  RESUME = 'resume',
  DISCONNECT = 'disconnect',
  CHANGE_PACKAGE = 'change-package',
  CHANGE_PASSWORD = 'change-password',
}