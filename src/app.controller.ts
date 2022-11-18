import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { users as UserModel, users } from '@prisma/client';
import { profType } from 'type/UserType';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async signupUser(
    @Body() userData: { firebase_id: string; comment?: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get('user/:firebase_id')
  async getUser(@Param('firebase_id') firebase_id: string): Promise<users> {
    return this.userService.user({
      firebase_id: firebase_id,
    });
  }
  @Get('usersAll')
  async getUsers(): Promise<undefined> {
    return this.userService.usersAll();
  }

  @Delete('user/:firebase_id')
  async deleteUser(
    @Param('firebase_id') firebase_id: string,
  ): Promise<{ firebase_id?: string }> {
    return this.userService.deleteUser({
      firebase_id: firebase_id,
    });
  }

  @Put('user/:firebase_id')
  async updateUser(
    @Param('firebase_id') firebase_id: string,
    @Body()
    profData: profType,
  ): Promise<any> {
    return this.userService.updateUser({
      where: {
        firebase_id: firebase_id,
      },
      data: profData,
    });
  }
}
