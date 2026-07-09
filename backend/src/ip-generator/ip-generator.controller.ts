import {
  Controller,
  Param,
  Post,
} from '@nestjs/common';

import { IpGeneratorService } from './ip-generator.service';

@Controller('ip-generator')
export class IpGeneratorController {
  constructor(
    private readonly generator: IpGeneratorService,
  ) {}

  @Post(':ipPoolId')
  generate(
    @Param('ipPoolId') ipPoolId: string,
  ) {
    return this.generator.generate(ipPoolId);
  }
}