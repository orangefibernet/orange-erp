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

import { DesignationService } from './designation.service';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';

@ApiTags('Designation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('designation')
export class DesignationController {
  constructor(
    private readonly designationService: DesignationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Designation' })
  create(
    @CurrentUser() user: any,
    @Body() dto: CreateDesignationDto,
  ) {
    return this.designationService.create(
      user.companyId,
      dto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'List Designations' })
  findAll(
    @CurrentUser() user: any,
    @Query() query: PaginationDto,
  ) {
    return this.designationService.findAll(
      user.companyId,
      query,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Designation' })
  findOne(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.designationService.findOne(
      user.companyId,
      id,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Designation' })
  update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdateDesignationDto,
  ) {
    return this.designationService.update(
      user.companyId,
      id,
      dto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Designation' })
  remove(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.designationService.remove(
      user.companyId,
      id,
    );
  }
}