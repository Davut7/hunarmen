import { Module } from '@nestjs/common';
import { AdminAuthModule } from './auth/auth.module';
import { PrismaModule } from 'src/utils/prisma/prisma.module';
import { AdminTokenModule } from './token/token.module';

@Module({
  imports: [AdminAuthModule, AdminModule, PrismaModule, AdminTokenModule],
})
export class AdminModule {}
