import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { UserTagService } from './user_tag.service';
import { UserTag } from './user_tag.model';
import { TokenGuard } from '../auth/token.guard';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

@Resolver()
export class UserTagResolver {
    constructor(
        private userTagService: UserTagService,
        private authServise: AuthService) {}

    @Mutation(() => UserTag, { name: "favorite_tag_toggle"})
    @UseGuards(TokenGuard)
    async toggleFollow (
        @Args('tid', {type: () => Int}) tid: number,
        @Context() context
    ) {
        try {
            const uid_token: string = context.req.idTokenUser?.user_id 
            return await this.userTagService.UserTagCreateOrDelete(tid, uid_token );
        } catch (error) {
            console.log(error);
            throw new HttpException("Faild to favorite toggle", HttpStatus.BAD_REQUEST)
        }
    }
}
