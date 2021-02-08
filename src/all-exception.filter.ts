import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import type { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter<T extends Error> implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = this.matchStatus(exception);

    response.status(status).json({
      status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private matchStatus<T extends Error>(exception: T): HttpStatus {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    if (exception instanceof PrismaClientKnownRequestError) {
      // Reference: https://www.prisma.io/docs/reference/api-reference/error-referenc
      this.logger.log(`Prisma ErrorCode ${exception.code}`);
      return HttpStatus.BAD_REQUEST;
    }

    this.logger.error(exception);
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
