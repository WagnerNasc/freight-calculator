import { IsBoolean, IsEnum, IsNumber } from 'class-validator';

export enum Tabela {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export enum TipoCarga {
  GRANEL_SOLIDO = 'granel_sólido',
  GRANEL_LIQUIDO = 'granel_líquido',
  FRIGORIFICADA_OU_AQUECIDA = 'frigorificada_ou_aquecida',
  CONTEINERIZADA = 'conteinerizada',
  CARGA_GERAL = 'carga_geral',
  NEOGRANEL = 'neogranel',
  PERIGOSA_GRANEL_SOLIDO = 'perigosa_(granel_sólido)',
  PERIGOSA_GRANEL_LIQUIDO = 'perigosa_(granel_líquido)',
  PERIGOSA_FRIGORIFICADA = 'perigosa_(frigorificada_ou_aquecida)',
  PERIGOSA_CONTEINERIZADA = 'perigosa_(conteinerizada)',
  PERIGOSA_CARGA_GERAL = 'perigosa_(carga_geral)',
  CARGA_GRANEL_PRESSURIZADA = 'carga_granel_pressurizada',
}

export class CalcularFreteDto {
  @IsEnum(Tabela)
  tabela: Tabela;

  @IsEnum(TipoCarga)
  tipo_carga: TipoCarga;

  @IsNumber()
  eixos: number;

  @IsNumber()
  distancia: number;

  @IsBoolean()
  retorno_vazio: boolean;
}
