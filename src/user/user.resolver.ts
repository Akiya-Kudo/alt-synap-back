import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { createUserInput, updateUserInput } from 'src/custom_models/mutation.model';
import { CollectionService } from 'src/collection/collection.service';
import { TokenGuard } from 'src/auth/token.guard';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

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
    const login_user: User = await this.userService.user({ uid });
    if (login_user) {
      const collections = await this.collectionService.userCollections(login_user.uuid_uid)
      login_user.collections = collections
    }
    
    return login_user
  }

  @Mutation(() => User, { name: "create_user"})
  async createUser(
    @Args('userData') 
    userData: createUserInput
  ) {
    const { uid, uuid_uid, lang_type } = userData;
    console.log(uid, uuid_uid );
    return this.userService.createUser({ 
      uid, 
      uuid_uid,
      lang_type
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
