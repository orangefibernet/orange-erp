import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Delete,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { EmployeeDocumentService } from './employee-document.service';
import { CreateEmployeeDocumentDto } from './dto/create-employee-document.dto';

@ApiTags('Employee Documents')
@ApiBearerAuth('JWT')
@Controller('employee/:employeeId/documents')
export class EmployeeDocumentController {
  constructor(
    private readonly service: EmployeeDocumentService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Upload employee document',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        documentType: {
          type: 'string',
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
  upload(
    @Param('employeeId') employeeId: string,
    @Body() dto: CreateEmployeeDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.upload(
      employeeId,
      dto,
      file,
    );
  }
  @Get()
findAll(
  @Param('employeeId') employeeId: string,
) {
  return this.service.findAll(employeeId);
}

@Get(':documentId')
findOne(
  @Param('employeeId') employeeId: string,
  @Param('documentId') documentId: string,
) {
  return this.service.findOne(
    employeeId,
    documentId,
  );
}

@Delete(':documentId')
remove(
  @Param('employeeId') employeeId: string,
  @Param('documentId') documentId: string,
) {
  return this.service.remove(
    employeeId,
    documentId,
  );
}
}