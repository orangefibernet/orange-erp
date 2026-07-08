import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { DocumentType } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { StorageService } from '../storage/storage.service';

import { CreateEmployeeDocumentDto } from './dto/create-employee-document.dto';

@Injectable()
export class EmployeeDocumentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  async upload(
    employeeId: string,
    file: any,
    dto: CreateEmployeeDocumentDto,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const objectKey = `employees/${employeeId}/${Date.now()}-${file.originalname}`;

    const upload = await this.storage.upload(
      objectKey,
      file.buffer,
      file.mimetype,
    );

    const document = await this.prisma.employeeDocument.create({
      data: {
        employeeId,
        documentType: dto.documentType as DocumentType,
        fileName: file.originalname,
        objectKey: upload.objectKey,
        mimeType: file.mimetype,
        fileSize: file.size,
        remarks: dto.remarks,
      },
    });

    return {
      success: true,
      message: 'Document uploaded successfully.',
      data: document,
    };
  }

  // ✅ Correct place
  async findByEmployee(employeeId: string) {
    return this.prisma.employeeDocument.findMany({
      where: {
        employeeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
async download(documentId: string) {
  const document = await this.prisma.employeeDocument.findUnique({
    where: {
      id: documentId,
    },
  });

  if (!document) {
    throw new NotFoundException('Document not found');
  }

  const url = await this.storage.getPresignedUrl(
    document.objectKey,
  );

  return {
    documentId: document.id,
    fileName: document.fileName,
    documentType: document.documentType,
    downloadUrl: url,
  };
}
async remove(documentId: string) {
  const document = await this.prisma.employeeDocument.findUnique({
    where: {
      id: documentId,
    },
  });

  if (!document) {
    throw new NotFoundException('Document not found');
  }

  await this.storage.delete(document.objectKey);

  await this.prisma.employeeDocument.delete({
    where: {
      id: documentId,
    },
  });

  return {
    success: true,
    message: 'Document deleted successfully.',
  };
}
}
