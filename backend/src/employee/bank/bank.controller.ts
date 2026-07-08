import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@ApiTags('Employee Bank')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('employees/:employeeId/bank')
export class BankController {
  constructor(
    private readonly bankService: BankService,
  ) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.HR)
  @ApiOperation({
    summary: 'Create employee bank details',
  })
  create(
    @Param('employeeId') employeeId: string,
    @Body() dto: CreateBankDto,
  ) {
    return this.bankService.create(employeeId, dto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.HR)
  @ApiOperation({
    summary: 'Get employee bank details',
  })
  findOne(
    @Param('employeeId') employeeId: string,
  ) {
    return this.bankService.findOne(employeeId);
  }

  @Patch()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.HR)
  @ApiOperation({
    summary: 'Update employee bank details',
  })
  update(
    @Param('employeeId') employeeId: string,
    @Body() dto: UpdateBankDto,
  ) {
    return this.bankService.update(employeeId, dto);
  }

  @Delete()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Delete employee bank details',
  })
  remove(
    @Param('employeeId') employeeId: string,
  ) {
    return this.bankService.remove(employeeId);
  }
}