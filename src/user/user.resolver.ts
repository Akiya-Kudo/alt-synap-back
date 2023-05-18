import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { createUserInput, updateUserInput } from 'src/custom_models/mutation.model';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User], { name: 'users_all', nullable: 'items' })
  async getUsersAll() {
    return this.userService.usersAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  async getUser(
    @Args('uid') 
    uid: string
  ) {
    return this.userService.user({ uid });
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
  // @Mutation(() => User)
  // async registerUser(@Args('createUserInfoData') createUserInfoData: createUserInfoInput) {
  //   console.log(createUserInfoData.firebase_id);
  //   return this.userService.createUser({ 
  //     uid: createUserInfoData.firebase_id, 
  //     user_name: createUserInfoData.user_name 
  //   });
  // }

  @Mutation(() => User, { name: "update_user_info" })
  async updateUser(
    @Args('userData') 
    userData: updateUserInput,
  ) {

    return this.userService.updateUser({
      where: { uid: userData.uid },
      data: {
        comment: userData.comment,
        lang_type: userData.lang_type,
      },
    });
  }
  // @Mutation(() => User)
  // async updateUserInfo(
  //   @Args('updateUserInfoData') updateUserInfoData: updateUserInfoInput,
  // ) {
  //   console.log(updateUserInfoData);
  //   return this.userService.updateUser({
  //     where: { firebase_id: updateUserInfoData.firebase_id },
  //     data: {
  //       comment: updateUserInfoData.comment,
  //       user_name: updateUserInfoData.user_name,
  //       photo_url: updateUserInfoData.photo_url,
  //       lang_type: updateUserInfoData.lang_type,
  //     },
  //   });
  // }
}
