import { MiddlewareConsumer, Module, OnModuleInit } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/core/allException.filter';
import { LogsMiddleware } from './logger/middleware/logs.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { TerminusModule } from '@nestjs/terminus';
import { MediaModule } from './media/media.module';
import { RedisModule } from './redis/redis.module';
import { AdminUserService } from './admin/user/user.service';
import { MinioModule } from './minio/minio.module';
import { validate } from './config/env.validation';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      validate,
      isGlobal: true,
      cache: true,
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: 'redis',
        ttl: 60,
        host: configService.getOrThrow<string>('REDIS_HOST'),
        port: configService.getOrThrow<number>('REDIS_PORT'),
        username: configService.getOrThrow<string>('REDIS_USERNAME'),
        password: configService.getOrThrow<string>('REDIS_PASSWORD'),
        no_ready_check: true,
      }),
    }),
    TerminusModule.forRoot(),
    LoggerModule,
    // HealthModule,
    MediaModule,
    MinioModule,
    RedisModule,
    AdminModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor() {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
  async onModuleInit() {
    // const user: CreateAdminUserDto = {
    //   firstName: 'admin',
    //   password: 'Admin123!',
    // };
    // const users = await this.adminUserService.isAdminUserExists();
    // if (users.length <= 0) {
    //   await this.adminUserService.createUser(user);
    // } else {
    return console.log('Default admin user already exists');
    // }
  }
}
