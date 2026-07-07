import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth() {
    return {
      status: 'ok',
      service: 'Orange ERP API',
      database: 'connected',
      version: '0.1.0',
      timestamp: new Date(),
    };
  }
}