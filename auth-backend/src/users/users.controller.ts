import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() body: { email: string; name: string; password: string }) {
    return this.usersService.signup(body.email, body.name, body.password);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK) // Explicitly set to return 200 OK  
  async signin(@Body() body: { email: string; password: string }) {
    return this.usersService.signin(body.email, body.password);
  }
}