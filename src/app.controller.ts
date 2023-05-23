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
import { createUserInput, updateUserInput } from 'src/custom_models/mutation.model';

type profType = {
  firebase_id?: null | string;
  user_name?: null | string;
  photo_url?: null | string;
  comment?: null | string;
  pinterest_user_id?: null | string;
};

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async signupUser(
    @Body() userData: createUserInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get('user/:firebase_id')
  async getUser(@Param('uid') uid: string): Promise<users> {
    return this.userService.user({
      uid: uid,
    });
  }
  @Get('usersAll')
  async getUsers(): Promise<any> {
    return this.userService.usersAll();
  }

  @Delete('user/:uid')
  async deleteUser(
    @Param('uid') uid: string,
  ): Promise<{ uid?: string }> {
    return this.userService.deleteUser({
      uid: uid,
    });
  }

  @Put('user/:uid')
  async updateUser(
    @Param('uid') uid: string,
    @Body()
    profData: profType,
  ): Promise<any> {
    return this.userService.updateUser({
      where: {
        uid: uid,
      },
      data: profData,
    });
  }
}
