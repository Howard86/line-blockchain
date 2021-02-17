import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter());
  app.useStaticAssets(setUrl('public'));
  app.setBaseViewsDir(setUrl('views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT || 3000);
}

function setUrl(folderName: string): string {
  return join(__dirname, '..', folderName);
}

bootstrap();
