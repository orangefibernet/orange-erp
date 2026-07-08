import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuditService {
  private readonly logger = new Logger('AUDIT');

  log(
    action: string,
    user: string,
    companyId: string,
    details?: unknown,
  ) {
    this.logger.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        action,
        user,
        companyId,
        details,
      }),
    );
  }
}