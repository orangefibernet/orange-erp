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

import { EmployeeEmergencyContactService } from './employee-emergency-contact.service';
import { CreateEmployeeEmergencyContactDto } from './dto/create-employee-emergency-contact.dto';
import { UpdateEmployeeEmergencyContactDto } from './dto/update-employee-emergency-contact.dto';

@ApiTags('Employee Emergency Contact')
@ApiBearerAuth('JWT')
@Controller('employee-emergency-contact')
export class EmployeeEmergencyContactController {
  constructor(
    private readonly service: EmployeeEmergencyContactService,
  ) {}

  @Post(':employeeId')
  @ApiOperation({ summary: 'Create emergency contact' })
  create(
    @Param('employeeId') employeeId: string,
    @Body() dto: CreateEmployeeEmergencyContactDto,
  ) {
    return this.service.create(employeeId, dto);
  }

  @Get(':employeeId')
  @ApiOperation({ summary: 'Get emergency contact' })
  findOne(@Param('employeeId') employeeId: string) {
    return this.service.findOne(employeeId);
  }

  @Patch(':employeeId')
  @ApiOperation({ summary: 'Update emergency contact' })
  update(
    @Param('employeeId') employeeId: string,
    @Body() dto: UpdateEmployeeEmergencyContactDto,
  ) {
    return this.service.update(employeeId, dto);
  }

  @Delete(':employeeId')
  @ApiOperation({ summary: 'Delete emergency contact' })
  remove(@Param('employeeId') employeeId: string) {
    return this.service.remove(employeeId);
  }
}