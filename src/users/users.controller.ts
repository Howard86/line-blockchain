import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NullCheckInterceptor } from '../null-check.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll({});
  }

  @Get(':id')
  @UseInterceptors(NullCheckInterceptor)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: parseInt(id, 10) });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({
      where: { id: parseInt(id, 10) },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id: parseInt(id, 10) });
  }
}
