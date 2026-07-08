import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeBankDto } from './create-employee-bank.dto';

export class UpdateEmployeeBankDto extends PartialType(
  CreateEmployeeBankDto,
) {}