import { User } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateUserDto
  implements Omit<User, 'id' | 'createdAt' | 'updatedAt'> {
  @IsUrl()
  readonly profileUrl: string;

  @IsOptional()
  readonly statusMessage: string;

  @IsNotEmpty()
  readonly lineUserId: string;

  @IsNotEmpty()
  readonly displayName: string;
}
