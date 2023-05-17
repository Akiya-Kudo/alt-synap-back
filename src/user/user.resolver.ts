import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { createUserInfoInput, updateUserInfoInput } from 'src/custom_models/mutation.model';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User], { name: 'users_all', nullable: 'itemsAndList' })
  async getUsersAll() {
    return this.userService.usersAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  async getUser(@Args('firebase_id') firebase_id: string) {
    return this.userService.user({ firebase_id });
  }

  @Mutation(() => User)
  async registerUser(@Args('createUserInfoData') createUserInfoData: createUserInfoInput) {
    console.log(createUserInfoData.firebase_id);
    return this.userService.createUser({ firebase_id: createUserInfoData.firebase_id, user_name: createUserInfoData.user_name });
  }

  @Mutation(() => User)
  async updateUserInfo(
    @Args('updateUserInfoData') updateUserInfoData: updateUserInfoInput,
  ) {
    console.log(updateUserInfoData);
    return this.userService.updateUser({
      where: { firebase_id: updateUserInfoData.firebase_id },
      data: {
        comment: updateUserInfoData.comment,
        user_name: updateUserInfoData.user_name,
        photo_url: updateUserInfoData.photo_url,
        lang_type: updateUserInfoData.lang_type,
      },
    });
  }
}
