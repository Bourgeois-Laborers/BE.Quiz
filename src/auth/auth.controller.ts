import { Body, Res, Controller, Post, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { Serialize } from '@common/decorators/serialize.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { Cookie } from '@common/decorators/cookie-parser.decorator';

import { AuthService } from './auth.service';
import { SignUpResponseDto } from './dto/sign-up.dto';
import { SignInDto, SignInResponseDto } from './dto/sign-in.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @Serialize(SignUpResponseDto)
  @ApiResponse({ status: HttpStatus.OK, type: SignUpResponseDto })
  async signUp(@Res({ passthrough: true }) response: Response): Promise<{ accessToken: string }> {
    const { accessToken, refreshToken } = await this.authService.signUp();

    response.cookie('RefreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return { accessToken };
  }

  @Post('sign-in')
  @Serialize(SignInResponseDto)
  @ApiResponse({ status: HttpStatus.OK, type: SignInResponseDto })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    const { accessToken, refreshToken } = await this.authService.signIn(signInDto);

    response.cookie('RefreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return { accessToken };
  }

  @Post('refresh-token')
  @Serialize(RefreshTokenResponseDto)
  @ApiResponse({ status: HttpStatus.OK, type: RefreshTokenResponseDto })
  async refreshToken(
    @Cookie('RefreshToken') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    const { accessToken, refreshToken: newRefreshToken } = await this.authService.refreshToken({ refreshToken });

    response.cookie('Refresh', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return { accessToken };
  }
}
