import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import type { Response, Request } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaFilter<T extends PrismaClientKnownRequestError>
  implements ExceptionFilter {
  private readonly UNKNOWN_ERROR = 'Unknown Errors';

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const description = this.matchErrorCode(exception.code);
    const status =
      description === this.UNKNOWN_ERROR
        ? HttpStatus.INTERNAL_SERVER_ERROR
        : HttpStatus.BAD_REQUEST;

    response.status(status).json({
      status,
      message: exception.meta
        ? `${description} ${JSON.stringify(exception.meta)}`
        : description,
      code: exception.code,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  // Reference: https://www.prisma.io/docs/reference/api-reference/error-reference
  private matchErrorCode(code: string): string {
    switch (code) {
      case 'P2002':
        return 'Unique constraint failed on the';
      case 'P2016':
        return 'Query interpretation error';
      default:
        return this.UNKNOWN_ERROR;
    }
  }
}
