import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { createUserInput, updateUserInput } from 'src/custom_models/mutation.model';
import { CollectionService } from 'src/collection/collection.service';

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
    const collections = await this.collectionService.userCollections(login_user.uuid_uid)
    login_user.collections = collections
    
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
}
