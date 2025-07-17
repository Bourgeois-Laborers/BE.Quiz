import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCookieAuth,
} from '@nestjs/swagger';

import { UserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get user details' })
  @ApiCookieAuth('accessToken')
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
}
