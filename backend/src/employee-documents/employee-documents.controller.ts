import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { EmployeeDocumentsService } from './employee-documents.service';
import { CreateEmployeeDocumentDto } from './dto/create-employee-document.dto';

@ApiTags('Employee Documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('employee-documents')
export class EmployeeDocumentsController {
  constructor(
    private readonly service: EmployeeDocumentsService,
  ) {}

  @Get('employee/:employeeId')
@ApiOperation({ summary: 'List Employee Documents' })
findByEmployee(
  @Param('employeeId') employeeId: string,
) {
  return this.service.findByEmployee(employeeId);
}
  @Post(':employeeId')
  @ApiOperation({ summary: 'Upload Employee Document' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        documentType: {
          type: 'string',
          example: 'AADHAAR',
        },
        remarks: {
          type: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
  FileInterceptor('file', {
    storage: memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
    },
  }),
)
  upload(
    @Param('employeeId') employeeId: string,
    @UploadedFile() file: any,
    @Body() dto: CreateEmployeeDocumentDto,
  ) {
    return this.service.upload(
      employeeId,
      file,
      dto,
    );
  }
  @Delete(':id')
@ApiOperation({ summary: 'Delete Employee Document' })
remove(
  @Param('id') id: string,
) {
  return this.service.remove(id);
}
}
