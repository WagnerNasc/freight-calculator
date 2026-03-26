import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FreteService } from './frete.service';
import { FreteController } from './frete.controller';
import { ScraperService } from './scraper/scraper.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [FreteService, ScraperService],
  controllers: [FreteController],
})
export class FreteModule {}
