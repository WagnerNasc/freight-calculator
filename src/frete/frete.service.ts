import { Injectable } from '@nestjs/common';
import { ScraperService } from './scraper/scraper.service';
import { parseTabelaFrete } from './parsers/tabela.parser';
import { getEixoValido } from './utils/frete.utils';
import { CalcularFreteDto, Tabela } from './dto/frete.dto';

const TABELA_INDICE: Record<Tabela, number> = {
  [Tabela.A]: 0,
  [Tabela.B]: 1,
  [Tabela.C]: 2,
  [Tabela.D]: 3,
};

@Injectable()
export class FreteService {
  constructor(private readonly scraper: ScraperService) {}

  async calcular(dto: CalcularFreteDto) {
    const html = await this.scraper.getHtml();
    const tabela = parseTabelaFrete(html, TABELA_INDICE[dto.tabela]);

    const tipo = tabela[dto.tipo_carga];
    if (!tipo) {
      throw new Error(`Tipo de carga inválido: ${dto.tipo_carga}`);
    }

    const eixosDisponiveis = Object.keys(tipo).map(Number);
    const eixo = getEixoValido(eixosDisponiveis, dto.eixos);
    const { ccd, cc } = tipo[eixo];

    let valor = dto.distancia * ccd + cc;

    if (dto.retorno_vazio) {
      valor += 0.92 * dto.distancia * ccd;
    }

    return {
      valor: Number(valor.toFixed(2)),
      eixoUtilizado: eixo,
      detalhes: { ccd, cc },
    };
  }
}
