import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtUser } from '../common/interfaces/jwt-user.interface';
import { PaginationDto } from '../common/pagination/pagination.dto';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';

@ApiTags('Employees')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiOperation({ summary: 'Create Employee' })
  create(
    @CurrentUser() user: JwtUser,
    @Body() dto: CreateEmployeeDto,
  ) {
    return this.employeeService.create(user.companyId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List Employees' })
  findAll(
    @CurrentUser() user: JwtUser,
    @Query() query: PaginationDto,
  ) {
    return this.employeeService.findAll(user.companyId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Employee' })
  findOne(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
  ) {
    return this.employeeService.findOne(user.companyId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Employee' })
  update(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(user.companyId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Employee' })
  remove(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
  ) {
    return this.employeeService.remove(user.companyId, id);
  }
}