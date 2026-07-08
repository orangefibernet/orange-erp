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
import { PaginationDto } from '../common/pagination/pagination.dto';

import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('Department')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('department')
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Department' })
  create(
    @CurrentUser() user: any,
    @Body() dto: CreateDepartmentDto,
  ) {
    return this.departmentService.create(
      user.companyId,
      dto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'List Departments' })
  findAll(
    @CurrentUser() user: any,
    @Query() query: PaginationDto,
  ) {
    return this.departmentService.findAll(
      user.companyId,
      query,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Department' })
  findOne(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.departmentService.findOne(
      user.companyId,
      id,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Department' })
  update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(
      user.companyId,
      id,
      dto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Department' })
  remove(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.departmentService.remove(
      user.companyId,
      id,
    );
  }
}