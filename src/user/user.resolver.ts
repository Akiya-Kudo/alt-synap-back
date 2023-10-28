import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { createUserInput, updateUserInput } from '../custom_models/mutation.model';
import { CollectionService } from '../collection/collection.service';
import { TokenGuard, TokenSecretGuard } from '../auth/token.guard';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { log } from 'console';

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
    private collectionService: CollectionService,
    ) {}

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(TokenGuard)
  async getLoginUser(
    @Context() context
  ) {
    try {
      const uid_token: string = context.req.idTokenUser?.user_id
      return await this.userService.user( uid_token );
    } catch (error) {
      log(error)
      throw new HttpException("Faild to get user infomation", HttpStatus.BAD_REQUEST)
    }
  }

  @Query(() => User, { name: 'other_user', nullable: true })
  @UseGuards(TokenSecretGuard)
  async getOtherUser(
    @Args('uuid_uid') uuid_uid: string,
    @Context() context
  ) {
    try {
      const uid_token: string = context.req.idTokenUser?.user_id 
      return await this.userService.other_user( uuid_uid, uid_token );
    } catch (error) {
        throw new HttpException("Faild to get users infomation", HttpStatus.BAD_REQUEST)
    }
  }

  @Mutation(() => User, { name: "create_user"})
  @UseGuards(TokenGuard)
  async createUser(
    @Args('userData') 
    userData: createUserInput,
    @Context() context
  ) {
    try {
      const uid_token: string = context.req.idTokenUser?.user_id 
      const { uuid_uid, user_name, user_image, lang_type } = userData;
      return await this.userService.createUser({ 
        uid: uid_token,
        uuid_uid,
        lang_type,
        user_name,
        user_image
      });
    } catch (error) {
      log(error)
      throw new HttpException("Faild to create users infomation", HttpStatus.BAD_REQUEST)
    }
  }

  @Mutation(() => User, { name: "update_user_info" })
  @UseGuards(TokenGuard)
  async updateUser(
    @Args('userData') userData: updateUserInput,
    @Context() context
  ) {
    try {
      const uid_token = context.req.idTokenUser.user_id
      return await this.userService.updateUser(userData, uid_token)
    } catch (error) {
      log(error)
        throw new HttpException("Faild to update user info", HttpStatus.BAD_REQUEST)
    }

  }
}
