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
}
