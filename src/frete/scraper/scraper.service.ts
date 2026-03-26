import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);
  private readonly douUrl: string;
  private cache: { html: string; fetchedAt: number } | null = null;
  private readonly ttl = 1000 * 60 * 60 * 24; // 24h
  private readonly maxRetries = 3;

  constructor(private config: ConfigService) {
    this.douUrl = this.config.getOrThrow<string>('DOU_URL');
  }

  async getHtml(): Promise<string> {
    if (this.cache && Date.now() - this.cache.fetchedAt < this.ttl) {
      return this.cache.html;
    }

    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const res = await fetch(this.douUrl);

        if (!res.ok) {
          throw new Error(`Falha ao acessar DOU: ${res.status}`);
        }

        const html = await res.text();
        this.cache = { html, fetchedAt: Date.now() };
        return html;
      } catch (err) {
        lastError = err as Error;
        this.logger.warn(
          `Tentativa ${attempt}/${this.maxRetries} falhou: ${lastError.message}`,
        );

        if (attempt < this.maxRetries) {
          await this.delay(1000 * 2 ** (attempt - 1));
        }
      }
    }

    if (this.cache) {
      this.logger.warn('Retornando cache expirado após falha nas retentativas');
      return this.cache.html;
    }

    throw lastError;
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
