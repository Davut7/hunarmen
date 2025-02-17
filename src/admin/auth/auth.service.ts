import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { AdminTokenService } from '../token/token.service';
import { AdminTokenDto } from '../token/dto/token.dto';
import { AdminLoginDto } from './dto/userLogin.dto';
import { verifyHash } from 'src/helpers/providers/generateHash';
import { PrismaService } from 'src/utils/prisma/prisma.service';
@Injectable()
export class AdminAuthService {
  constructor(
    private tokenService: AdminTokenService,
    private prismaService: PrismaService,
  ) {}

  async loginUser(dto: AdminLoginDto) {
    this.prismaService.adminUsers.create();
  }
  //     // const user = await this.userRepository.findOne({
  //     //   where: { firstName: dto.firstName },
  //     // });

  //     // if (!user)
  //     //   throw new NotFoundException(
  //     //     `User with first name ${dto.firstName} not found!`,
  //     //   );

  //     const isPasswordValid = await verifyHash(dto.password, user.password);

  //     if (!isPasswordValid)
  //       throw new BadRequestException('User password incorrect!');

  //     const tokens = this.tokenService.generateTokens({
  //       ...new AdminTokenDto(user),
  //     });

  //     await this.tokenService.saveTokens(user.id, tokens.refreshToken);

  //     return {
  //       message: 'User login successfully.',
  //       user,
  //       ...tokens,
  //     };
  //   }

  //   async logoutUser(refreshToken: string) {
  //     if (!refreshToken) throw new UnauthorizedException();
  //     await this.tokenService.deleteToken(refreshToken);
  //     return {
  //       message: 'User logged out.',
  //     };
  //   }

  //   async refreshToken(refreshToken: string) {
  //     if (!refreshToken)
  //       throw new UnauthorizedException('Refresh token not provided!');
  //     const tokenFromDB = await this.tokenService.findToken(refreshToken);
  //     const validToken = this.tokenService.validateRefreshToken(refreshToken);
  //     if (!validToken && !tokenFromDB)
  //       throw new UnauthorizedException('Invalid token!');
  //     const user = await this.userRepository.findOne({
  //       where: { id: validToken.id },
  //     });
  //     const tokens = this.tokenService.generateTokens({
  //       ...new AdminTokenDto(user),
  //     });
  //     await this.tokenService.saveTokens(user.id, tokens.refreshToken);
  //     return {
  //       ...tokens,
  //       user: new AdminTokenDto(user),
  //     };
  //   }
}
