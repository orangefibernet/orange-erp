import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  title: 'OrangeERP API',
  description: 'OrangeERP Backend REST API',
  version: 'v1',
}));