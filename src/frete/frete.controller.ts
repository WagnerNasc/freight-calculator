import { Body, Controller, Post } from '@nestjs/common';
import { FreteService } from './frete.service';
import { CalcularFreteDto } from './dto/frete.dto';

@Controller('frete')
export class FreteController {
  constructor(private readonly service: FreteService) {}

  @Post('calcular')
  calcular(@Body() dto: CalcularFreteDto) {
    return this.service.calcular(dto);
  }
}
