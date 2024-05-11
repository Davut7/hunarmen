import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import CustomLogger from './helpers/customLogger';
import { RedisModule } from '../redis/redis.module';
import { AdminTokenModule } from '../admin/token/token.module';

@Module({
  imports: [RedisModule, AdminTokenModule],
  controllers: [LoggerController],
  providers: [LoggerService, CustomLogger],
  exports: [CustomLogger],
})
export class LoggerModule {}
