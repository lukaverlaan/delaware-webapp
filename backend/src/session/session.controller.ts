import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from './session.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('sessions')
export class SessionController {
  constructor(private authService: AuthService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body('arg') loginDto: LoginRequestDto) {
    const token = await this.authService.login(loginDto);
    return { token };
  }
}
