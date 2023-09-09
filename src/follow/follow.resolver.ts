import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { FollowService } from './follow.service';
import { Follow } from './follow.model';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { log } from 'console';
import { TokenGuard, TokenSecretGuard } from 'src/auth/token.guard';

@Resolver()
export class FollowResolver {
    constructor(
        private followService: FollowService,
        private authServise: AuthService) {}

        @Query(() => [Follow], { name: "get_follow_list" })
        @UseGuards(TokenSecretGuard)
        async getFollowList(
            @Args('uuid_uid') uuid_uid: string,
            @Args('is_follower_list') is_follower_list:boolean, //followee list will gotten if this value is false
            @Args('offset', {type: () => Int}) offset:number,
            @Context() context
        ) {
            try {
                const uid_token: string = context.req.idTokenUser?.user_id 
                return await this.followService.getFollowList(uuid_uid, is_follower_list, offset, uid_token )
    
            } catch (error) {
                console.log(error);
                throw new HttpException("Faild to get follow list", HttpStatus.BAD_REQUEST)
            }
        }

    @Mutation(() => Follow, { name: "follow_toggle"})
    @UseGuards(TokenGuard)
    async toggleFollow (
        @Args('followee_uuid') followee_uuid: string,
        @Context() context
    ) {
        try {
            const uid_token: string = context.req.idTokenUser?.user_id 
            return await this.followService.FollowCreateOrDelete(followee_uuid, uid_token );
        } catch (error) {
            console.log(error);
            throw new HttpException("Faild to like the post", HttpStatus.BAD_REQUEST)
        }
    }
    
}
