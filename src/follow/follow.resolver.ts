import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { FollowService } from './follow.service';
import { Follow } from './follow.model';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { log } from 'console';
import { TokenGuard } from 'src/auth/token.guard';

@Resolver()
export class FollowResolver {
    constructor(
        private followService: FollowService,
        private authServise: AuthService) {}

    @Mutation(() => Follow, { name: "follow_toggle"})
    @UseGuards(TokenGuard)
    async toggleFollow (
        @Args('followee_uuid') followee_uuid: string,
        @Context() context
    ) {
        try {
            const uid_token: string = context.req.idTokenUser?.user_id 
            return await this.followService.LikeCreateOrDelete(followee_uuid, uid_token );
        } catch (error) {
            console.log(error);
            throw new HttpException("Faild to like the post", HttpStatus.BAD_REQUEST)
        }
    }
}
