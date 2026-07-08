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

import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@ApiTags('Branch')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('branch')
export class BranchController {
  constructor(
    private readonly branchService: BranchService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Branch' })
  create(
    @CurrentUser() user: any,
    @Body() dto: CreateBranchDto,
  ) {
    return this.branchService.create(
      user.companyId,
      dto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'List Branches' })
  findAll(
    @CurrentUser() user: any,
    @Query() query: PaginationDto,
  ) {
    return this.branchService.findAll(
      user.companyId,
      query,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Branch' })
  findOne(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.branchService.findOne(
      user.companyId,
      id,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Branch' })
  update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdateBranchDto,
  ) {
    return this.branchService.update(
      user.companyId,
      id,
      dto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Branch' })
  remove(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.branchService.remove(
      user.companyId,
      id,
    );
  }
}