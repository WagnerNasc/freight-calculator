import { Module } from '@nestjs/common';
import { FreteService } from './frete.service';
import { FreteController } from './frete.controller';
import { ScraperService } from './scraper/scraper.service';

@Module({
  providers: [FreteService, ScraperService],
  controllers: [FreteController],
})
export class FreteModule {}
