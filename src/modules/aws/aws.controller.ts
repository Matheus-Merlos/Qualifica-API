import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NodeHttpHandler } from '@aws-sdk/node-http-handler';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Controller, Get, Param } from '@nestjs/common';
import 'dotenv/config';

@Controller('aws')
export class AwsController {
  private readonly s3Client: S3Client;
  constructor() {
    this.s3Client = new S3Client({
      region: 'us-east-1',
      maxAttempts: 3,
      requestHandler: new NodeHttpHandler({ connectionTimeout: 3000 }),
      credentials: {
        accessKeyId: process.env.UPLOADER_ACCESS_KEY_ID!,
        secretAccessKey: process.env.UPLOADER_SECRET_ACCESS_KEY!,
      },
    });
  }

  @Get('presigned-url/:fileName/:fileType')
  async getPresignedURL(
    @Param('fileName') fileName: string,
    @Param('fileType') fileType: string,
  ) {
    const command = new PutObjectCommand({
      Bucket: 'qualifica-mais-thumbnail-bucket',
      Key: fileName,
      ContentType: fileType,
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 120 });
    return { url };
  }
}
