import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createUserInfoInput, updateUserInfoInput, UserModel } from './user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserModel], { name: 'AllUsers', nullable: 'itemsAndList' })
  async usersAll() {
    return this.userService.usersAll();
  }

  @Query(() => UserModel, { name: 'user', nullable: true })
  async user(@Args('firebase_id') firebase_id: string) {
    return this.userService.user({ firebase_id });
  }

  @Mutation(() => UserModel)
  async registerUser(@Args('createUserInfoData') createUserInfoData: createUserInfoInput) {
    console.log(createUserInfoData.firebase_id);
    return this.userService.createUser({ firebase_id: createUserInfoData.firebase_id, user_name: createUserInfoData.user_name });
  }

  @Mutation(() => UserModel)
  async updateUserInfo(
    @Args('updateUserInfoData') updateUserInfoData: updateUserInfoInput,
  ) {
    console.log('helo');
    console.log(updateUserInfoData);
    return this.userService.updateUser({
      where: { firebase_id: updateUserInfoData.firebase_id },
      data: {
        comment: updateUserInfoData.comment,
        user_name: updateUserInfoData.user_name,
        photo_url: updateUserInfoData.photo_url,
        pinterest_user_id: updateUserInfoData.pinterest_user_id,
      },
    });
  }
}
