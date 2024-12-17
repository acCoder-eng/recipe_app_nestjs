import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class MinioService {
  private readonly minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: +process.env.MINIO_PORT,
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  }

  async uploadImage(bucketName: string, objectName: string, file: Buffer, metaData: any) {
    return new Promise((resolve, reject) => {
      this.minioClient.putObject(bucketName, objectName, file, metaData, (err: any, etag: unknown) => {
        if (err) return reject(err);
        resolve(etag);
      });
    });
  }

  getImageUrl(bucketName: string, objectName: string): string {
    return `${process.env.MINIO_URL}/${bucketName}/${objectName}`;
  }
} 