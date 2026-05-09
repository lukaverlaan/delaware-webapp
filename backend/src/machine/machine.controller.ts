import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MachineListResponseDto, MachineResponseDto } from './machine.dto';
import { MachineService } from './machine.service';

@Controller('machines')
export class MachineController {
  constructor(private readonly MachineService: MachineService) {}

  @Get()
  getAllMachines(): Promise<MachineListResponseDto> {
    return this.MachineService.getAll();
  }

  @Get(':id')
  getMachineById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MachineResponseDto> {
    return this.MachineService.getById(Number(id));
  }

  @Get('/site/:id')
  getMachinePerSiteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MachineListResponseDto> {
    return this.MachineService.getBySiteId(Number(id));
  }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // createPlace(@Body() createPlaceDto: CreatemachineRequestDTO): string {
  // return `This action adds a new place ${createPlaceDto.naam}`;
  // }
}
