import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SiteListResponseDto, SiteResponseDto } from './site.dto';
import { SiteService } from './site.service';

@Controller('sites')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Get()
  getAllSites(): Promise<SiteListResponseDto> {
    return this.siteService.getAll();
  }

  @Get(':id')
  getSiteById(@Param('id', ParseIntPipe) id: number): Promise<SiteResponseDto> {
    return this.siteService.getById(Number(id));
  }

  @Get('naam/:naam')
  getSiteByName(@Param('naam') naam: string): Promise<SiteResponseDto> {
    return this.siteService.getByName(String(naam));
  }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // createPlace(@Body() createPlaceDto: CreateSiteRequestDTO): string {
  // return `This action adds a new place ${createPlaceDto.naam}`;
  // }
}
