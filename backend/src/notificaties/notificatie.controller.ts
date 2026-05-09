import { Controller, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { NotificatieService } from './notificatie.service';
import { NotificatieListResponseDto } from './notificatie.dto';

@Controller('notificaties')
export class NotificatieController {
  constructor(private readonly notificatieService: NotificatieService) {}

  @Get()
  getAll(): Promise<NotificatieListResponseDto> {
    const userId = 1;
    return this.notificatieService.getAll(userId);
  }

  @Patch(':id/read')
  markAsRead(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.notificatieService.markAsRead(id);
  }
}
