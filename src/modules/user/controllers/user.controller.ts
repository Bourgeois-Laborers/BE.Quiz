import { Controller, Post, Get, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

import { AuthGuard } from '@/modules/auth/guards/auth.guard';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user details' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user details.',
    type: UserDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getSession(@Param('userId') userId: string): Promise<UserDto> {
    return this.userService.get(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  async create(): Promise<UserDto> {
    return this.userService.create();
  }
}
