import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Req,
} from '@nestjs/common';
import { TaakService } from './taak.service';
import {
  CreateTaakRequestDto,
  TaakListResponseDto,
  TaakResponseDto,
  UpdateTaakRequestDto,
} from './taak.dto';
import { Request } from 'express';
import { JwtPayload } from '../types/auth';

@Controller('taken')
export class TaakController {
  constructor(private readonly taakService: TaakService) {}

  @Get()
  getAll(
    @Req() req: Request & { user: JwtPayload },
  ): Promise<TaakListResponseDto> {
    return this.taakService.getAll(req.user);
  }

  @Get(':id')
  getById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request & { user: JwtPayload },
  ): Promise<TaakResponseDto> {
    return this.taakService.getById(id, req.user);
  }

  @Post()
  create(@Body() body: CreateTaakRequestDto): Promise<TaakResponseDto> {
    return this.taakService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaakRequestDto,
  ): Promise<TaakResponseDto> {
    return this.taakService.update(id, body);
  }
}
