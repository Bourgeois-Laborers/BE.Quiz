import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { ControllerComposeDecorator } from '@common/decorators/controller-compose.decorator';
import { Serialize } from '@common/decorators/serialize.decorator';

import { AuthService } from './auth.service';

import { SignUpResponseDto } from './dto/sign-up.dto';
import { SignInDto, SignInResponseDto } from './dto/sign-in.dto';
import { RefreshTokenDto, RefreshTokenResponseDto } from './dto/refresh-token.dto';

@Controller('auth')
@ControllerComposeDecorator({ guards: [] })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @Serialize(SignUpResponseDto)
  @ApiResponse({ status: HttpStatus.OK, type: SignUpResponseDto })
  async signUp(): Promise<{ accessToken: string; refreshToken: string }> {
    const { accessToken, refreshToken } = await this.authService.signUp();

    return { accessToken, refreshToken };
  }

  @Post('sign-in')
  @Serialize(SignInResponseDto)
  @ApiResponse({ status: HttpStatus.OK, type: SignInResponseDto })
  async signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { accessToken, refreshToken } = await this.authService.signIn(signInDto);

    return { accessToken, refreshToken };
  }

  @Post('refresh-token')
  @Serialize(RefreshTokenResponseDto)
  @ApiResponse({ status: HttpStatus.OK, type: RefreshTokenResponseDto })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { accessToken, refreshToken: newRefreshToken } = await this.authService.refreshToken(refreshTokenDto);

    return { accessToken, refreshToken: newRefreshToken };
  }
}
