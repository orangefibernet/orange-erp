import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { extname } from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class StorageService implements OnModuleInit {
  private client: Minio.Client;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.get<string>('MINIO_BUCKET')!;

    this.client = new Minio.Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT')!,
      port: Number(this.configService.get('MINIO_PORT')),
      useSSL: this.configService.get('MINIO_SSL') === 'true',
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY')!,
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY')!,
    });
  }

  async onModuleInit() {
    const exists = await this.client.bucketExists(this.bucket);

    if (!exists) {
      await this.client.makeBucket(this.bucket, 'us-east-1');
      console.log(`✅ Bucket '${this.bucket}' created`);
    } else {
      console.log(`✅ Bucket '${this.bucket}' exists`);
    }
  }

  private generateObjectKey(
    folder: string,
    originalName: string,
  ): string {
    return `${folder}/${randomUUID()}${extname(originalName)}`;
  }

  async upload(
    objectName: string,
    buffer: Buffer,
    mimeType: string,
  ) {
    try {
      await this.client.putObject(
        this.bucket,
        objectName,
        buffer,
        buffer.length,
        {
          'Content-Type': mimeType,
        },
      );

      return {
        bucket: this.bucket,
        objectKey: objectName,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Upload failed: ${error.message}`,
      );
    }
  }

  async uploadFile(
    folder: string,
    file: Express.Multer.File,
  ) {
    const objectKey = this.generateObjectKey(
      folder,
      file.originalname,
    );

    await this.upload(
      objectKey,
      file.buffer,
      file.mimetype,
    );

    return {
      bucket: this.bucket,
      objectKey,
      url: await this.getPresignedUrl(objectKey),
    };
  }

  async delete(objectKey: string) {
    await this.client.removeObject(
      this.bucket,
      objectKey,
    );
  }

  async getPresignedUrl(objectKey: string) {
    return this.client.presignedGetObject(
      this.bucket,
      objectKey,
      60 * 60,
    );
  }
}