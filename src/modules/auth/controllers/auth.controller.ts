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

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: 'strict',
      path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'strict',
      path: '/',
    });

    res.status(201);
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
  async register(@Res() res: Response): Promise<UserDto> {
    const { user, accessToken, refreshToken } =
      await this.authService.register();

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: 'strict',
      path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'strict',
      path: '/',
    });

    res.status(201).json(user);

    return user;
  }
}
