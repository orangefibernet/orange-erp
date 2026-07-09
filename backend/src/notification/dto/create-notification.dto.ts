export class CreateNotificationDto {
  customerId?: string;

  employeeId?: string;

  title: string;

  message: string;

  type:
    | 'INFO'
    | 'SUCCESS'
    | 'WARNING'
    | 'ERROR';
}