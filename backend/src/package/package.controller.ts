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
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@ApiTags('Package')
@Controller('package')
export class PackageController {
  constructor(
    private readonly packageService: PackageService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Package' })
  create(
    @Body() dto: CreatePackageDto,
  ) {
    return this.packageService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Packages' })
  findAll() {
    return this.packageService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Package By Id' })
  findOne(
    @Param('id') id: string,
  ) {
    return this.packageService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Package' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePackageDto,
  ) {
    return this.packageService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Package' })
  remove(
    @Param('id') id: string,
  ) {
    return this.packageService.remove(id);
  }
}