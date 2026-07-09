export interface NotificationInterface {
  id?: string;

  customerId?: string;

  employeeId?: string;

  title: string;

  message: string;

  type:
    | 'INFO'
    | 'SUCCESS'
    | 'WARNING'
    | 'ERROR';

  read?: boolean;

  createdAt?: Date;
}