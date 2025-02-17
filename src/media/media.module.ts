import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MinioService } from '../minio/minio.service';
import { MinioModule } from '../minio/minio.module';


@Module({
  imports: [ MinioModule],
  providers: [MediaService, MinioService],
  exports: [MediaService, MinioService],
})
export class MediaModule {}
