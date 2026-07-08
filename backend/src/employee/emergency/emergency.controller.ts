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

import { EmergencyService } from './emergency.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';

@ApiTags('Employee Emergency')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('employees/:employeeId/emergency')
export class EmergencyController {
  constructor(
    private readonly emergencyService: EmergencyService,
  ) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.HR)
  @ApiOperation({
    summary: 'Create emergency contact',
  })
  create(
    @Param('employeeId') employeeId: string,
    @Body() dto: CreateEmergencyDto,
  ) {
    return this.emergencyService.create(employeeId, dto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.HR)
  @ApiOperation({
    summary: 'Get emergency contact',
  })
  findOne(
    @Param('employeeId') employeeId: string,
  ) {
    return this.emergencyService.findOne(employeeId);
  }

  @Patch()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.HR)
  @ApiOperation({
    summary: 'Update emergency contact',
  })
  update(
    @Param('employeeId') employeeId: string,
    @Body() dto: UpdateEmergencyDto,
  ) {
    return this.emergencyService.update(employeeId, dto);
  }

  @Delete()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Delete emergency contact',
  })
  remove(
    @Param('employeeId') employeeId: string,
  ) {
    return this.emergencyService.remove(employeeId);
  }
}