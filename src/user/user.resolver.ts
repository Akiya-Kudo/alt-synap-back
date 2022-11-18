import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserModel], { name: 'AllUsers', nullable: 'itemsAndList' })
  async usersAll() {
    console.log(this.userService.usersAll());
    return this.userService.usersAll();
  }
}
