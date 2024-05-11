import { Module } from '@nestjs/common';
import { AdminAuthService } from './auth.service';
import { AdminAuthController } from './auth.controller';
import { AdminTokenModule } from '../token/token.module';
import { RedisModule } from '../../redis/redis.module';

@Module({
  imports: [AdminTokenModule, RedisModule],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
  exports: [AdminAuthService],
})
export class AdminAuthModule {}
