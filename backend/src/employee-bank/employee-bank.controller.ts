import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { EmployeeBankService } from './employee-bank.service';
import { CreateEmployeeBankDto } from './dto/create-employee-bank.dto';
import { UpdateEmployeeBankDto } from './dto/update-employee-bank.dto';

@ApiTags('Employee Bank')
@ApiBearerAuth('JWT')
@Controller('employee-bank')
export class EmployeeBankController {
  constructor(
    private readonly employeeBankService: EmployeeBankService,
  ) {}

  @Post(':employeeId')
  @ApiOperation({ summary: 'Create employee bank details' })
  create(
    @Param('employeeId') employeeId: string,
    @Body() dto: CreateEmployeeBankDto,
  ) {
    return this.employeeBankService.create(employeeId, dto);
  }

  @Get(':employeeId')
  @ApiOperation({ summary: 'Get employee bank details' })
  findOne(@Param('employeeId') employeeId: string) {
    return this.employeeBankService.findOne(employeeId);
  }

  @Patch(':employeeId')
  @ApiOperation({ summary: 'Update employee bank details' })
  update(
    @Param('employeeId') employeeId: string,
    @Body() dto: UpdateEmployeeBankDto,
  ) {
    return this.employeeBankService.update(employeeId, dto);
  }

  @Delete(':employeeId')
  @ApiOperation({ summary: 'Delete employee bank details' })
  remove(@Param('employeeId') employeeId: string) {
    return this.employeeBankService.remove(employeeId);
  }
}