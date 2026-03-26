import { NestFactory } from '@nestjs/core';
import { FreteModule } from './frete/frete.module';


async function bootstrap() {
  const app = await NestFactory.create(FreteModule);
  await app.listen(process.env.PORT ?? 3333);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
