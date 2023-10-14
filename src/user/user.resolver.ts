import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { createUserInput, updateUserInput } from 'src/custom_models/mutation.model';
import { CollectionService } from 'src/collection/collection.service';
import { TokenGuard, TokenSecretGuard } from 'src/auth/token.guard';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { log } from 'console';

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
    private collectionService: CollectionService,
    ) {}

  @Query(() => User, { name: 'user', nullable: true })
  async getUser(
    @Args('uid') 
    uid: string
  ) {
    try {
      return await this.userService.user( uid );
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
  async createUser(
    @Args('userData') 
    userData: createUserInput
  ) {
    const { uid, uuid_uid, user_name, user_image, lang_type } = userData;
    return await this.userService.createUser({ 
      uid, 
      uuid_uid,
      lang_type,
      user_name,
      user_image
    });
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
        throw new HttpException("Faild to Upsert Post", HttpStatus.BAD_REQUEST)
    }

  }
}
