import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class AdminLoginDto {
  @ApiProperty({
    title: 'password',
    name: 'password',
    type: String,
    description:
      'User password. /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/',
    required: true,
    example: 'Test123!',
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
