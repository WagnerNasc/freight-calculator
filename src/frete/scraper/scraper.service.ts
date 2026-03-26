import { Injectable } from '@nestjs/common';

const DOU_URL =
  'https://www.in.gov.br/en/web/dou/-/portaria-suroc-n-4-de-20-de-marco-de-2026-694437180';

@Injectable()
export class ScraperService {
  private cache: { html: string; fetchedAt: number } | null = null;
  private readonly ttl = 1000 * 60 * 60 * 24; // 24h

  async getHtml(): Promise<string> {
    if (this.cache && Date.now() - this.cache.fetchedAt < this.ttl) {
      return this.cache.html;
    }

    const res = await fetch(DOU_URL);

    if (!res.ok) {
      throw new Error(`Falha ao acessar DOU: ${res.status}`);
    }

    const html = await res.text();
    this.cache = { html, fetchedAt: Date.now() };
    return html;
  }
}
