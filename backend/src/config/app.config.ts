import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: 'OrangeERP',
  version: '1.0.0',
  environment: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3001', 10),
  apiPrefix: process.env.API_PREFIX ?? 'api/v1',
}));