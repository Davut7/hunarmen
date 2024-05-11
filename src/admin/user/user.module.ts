import { Module } from '@nestjs/common';
import { AdminUserService } from './user.service';
import { AdminUserController } from './user.controller';
import { AdminTokenModule } from '../token/token.module';
import { RedisModule } from '../../redis/redis.module';

@Module({
  imports: [AdminTokenModule, RedisModule],
  controllers: [AdminUserController],
  providers: [AdminUserService],
  exports: [AdminUserService],
})
export class AdminUserModule {}
