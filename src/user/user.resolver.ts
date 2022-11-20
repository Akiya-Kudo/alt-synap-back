import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './user.model';
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
}
