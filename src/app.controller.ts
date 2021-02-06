import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  // Reference: https://github.com/line/line-liff-v2-starter
  @Get('send-id')
  getId(): { id: string } {
    return { id: this.configService.get<string>('LINE_LIFF_ID') || 'none' };
  }

  @Get()
  @Render('index')
  root(): void {
    return;
  }
}
