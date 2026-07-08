import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { StorageService } from '../storage/storage.service';

import { CreateEmployeeDocumentDto } from './dto/create-employee-document.dto';

@Injectable()
export class EmployeeDocumentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async upload(
    employeeId: string,
    dto: CreateEmployeeDocumentDto,
    file: Express.Multer.File,
  ) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const uploaded = await this.storageService.uploadFile(
      `employees/${employeeId}`,
      file,
    );

    return this.prisma.employeeDocument.create({
      data: {
        employeeId,
        documentType: dto.documentType,
        remarks: dto.remarks,
        fileName: file.originalname,
        objectKey: uploaded.objectKey,
        mimeType: file.mimetype,
        fileSize: file.size,
      },
    });
  }

  async findAll(employeeId: string) {
    return this.prisma.employeeDocument.findMany({
      where: { employeeId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(
    employeeId: string,
    documentId: string,
  ) {
    const document =
      await this.prisma.employeeDocument.findFirst({
        where: {
          id: documentId,
          employeeId,
        },
      });

    if (!document) {
      throw new NotFoundException(
        'Document not found',
      );
    }

    return {
      ...document,
      downloadUrl:
        await this.storageService.getPresignedUrl(
          document.objectKey,
        ),
    };
  }

  async remove(
    employeeId: string,
    documentId: string,
  ) {
    const document =
      await this.prisma.employeeDocument.findFirst({
        where: {
          id: documentId,
          employeeId,
        },
      });

    if (!document) {
      throw new NotFoundException(
        'Document not found',
      );
    }

    await this.storageService.delete(
      document.objectKey,
    );

    return this.prisma.employeeDocument.delete({
      where: {
        id: documentId,
      },
    });
  }
}