import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { Public } from '../decorators/public.decorator';
import { LoginDto } from '../dtos/login.dto';
import { NotAuthGuard } from '../guards/not-auth.guard';
import { AuthService } from '../services/auth.service';

import { UserDto } from '@/modules/user/dtos/user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(NotAuthGuard)
  @Public()
  @Post('/login')
  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been authenticated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const { accessToken, refreshToken } = await this.authService.login(
      loginDto.userId,
    );

    const accessTokenMaxAgeMs = this.authService.getAccessTokenMaxAgeMs();
    const refreshTokenMaxAgeMs = this.authService.getRefreshTokenMaxAgeMs();

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: accessTokenMaxAgeMs,
      sameSite: 'strict',
      path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenMaxAgeMs,
      sameSite: 'strict',
      path: '/',
    });

    res.status(201).json({ message: 'The user has been authenticated.' });
  }

  @UseGuards(NotAuthGuard)
  @Public()
  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been registered.',
    type: UserDto,
  })
  async register(@Res() res: Response): Promise<void> {
    const { user, accessToken, refreshToken } =
      await this.authService.register();

    const accessTokenMaxAgeMs = this.authService.getAccessTokenMaxAgeMs();
    const refreshTokenMaxAgeMs = this.authService.getRefreshTokenMaxAgeMs();

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: accessTokenMaxAgeMs,
      sameSite: 'strict',
      path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenMaxAgeMs,
      sameSite: 'strict',
      path: '/',
    });

    res.status(201).json({ message: 'The user has been registered.', data: user });
  }

  @Public()
  @Post('/logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'User logged out.' })
  async logout(@Res() res: Response): Promise<void> {
    res.clearCookie('accessToken', { httpOnly: true, path: '/' });
    res.clearCookie('refreshToken', { httpOnly: true, path: '/' });

    res.status(200).json({ message: 'User logged out.' });
  }
}
