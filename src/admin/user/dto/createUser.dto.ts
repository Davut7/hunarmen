import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateAdminUserDto extends PickType(AdminUsers, ['firstName', 'lastName'] as) {
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
