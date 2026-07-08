import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    return {
      application: 'OrangeERP',
      version: '1.0.0',
      status: 'Running',
      swagger: '/api',
      timestamp: new Date(),
    };
  }
}