import * as cheerio from 'cheerio';

function parseNumero(valor: string): number {
  return parseFloat(valor.replace('.', '').replace(',', '.'));
}

export type TabelaFrete = Record<string, Record<number, { ccd: number; cc: number }>>;

export function parseTabelaFrete(html: string, indiceTabela: number): TabelaFrete {
  const $ = cheerio.load(html);
  const tabela: TabelaFrete = {};
  const eixos = [2, 3, 4, 5, 6, 7, 9];

  const table = $('table.dou-table').eq(indiceTabela);
  const rows = table.find('tr');

  for (let i = 0; i < rows.length; i++) {
    const tds = $(rows[i]).find('td');
    const tipo = $(tds[1]).text().trim();
    const label = $(tds[2]).text().trim();

    if (tipo && label.includes('Deslocamento')) {
      const tipoKey = tipo.toLowerCase().replace(/\s+/g, '_');
      tabela[tipoKey] = {};

      const valoresCCD = tds.slice(4).map((_, el) => $(el).text().trim()).get();

      const nextRow = rows[i + 1];
      const ccTds = $(nextRow).find('td');
      const valoresCC = ccTds.slice(4).map((_, el) => $(el).text().trim()).get();

      for (let j = 0; j < eixos.length; j++) {
        const ccd = valoresCCD[j];
        const cc = valoresCC[j];

        if (ccd && cc) {
          tabela[tipoKey][eixos[j]] = {
            ccd: parseNumero(ccd),
            cc: parseNumero(cc),
          };
        }
      }
    }
  }

  return tabela;
}
