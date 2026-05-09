import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GebruikerService } from './gebruiker.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { CheckUserAccessGuard } from '../auth/guards/user-access.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GebruikerListResponseDto } from './gebruiker.dto';
import type { JwtPayload } from '../types/auth';

@Controller('gebruikers')
export class GebruikerController {
  constructor(private readonly gebruikerService: GebruikerService) {}

  @Get()
  @Roles('ADMINISTRATOR')
  getAllGebruikers(): Promise<GebruikerListResponseDto> {
    return this.gebruikerService.findAll();
  }

  @Get(':id')
  @UseGuards(CheckUserAccessGuard)
  getById(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    const userId = id === 'me' ? user.sub : Number(id);

    return this.gebruikerService.findById(userId);
  }
}
