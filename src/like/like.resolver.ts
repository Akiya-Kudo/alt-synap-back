import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/token.guard';
import { Like } from './like.model';
import { AuthService } from 'src/auth/auth.service';

@Resolver()
export class LikeResolver {
    constructor(
        private likeService: LikeService,
        private authServise: AuthService) {}

    @Mutation(() => Like, { name: "like_toggle"})
    @UseGuards(TokenGuard)
    async upsertLinkPost(
        @Args('uuid_pid') uuid_pid: string,
        @Context() context
    ) {
        try {
            const uid_token = context.req.idTokenUser.user_id
            return await this.likeService.likeCreateOrDelete(uuid_pid, uid_token)
        } catch (error) {
            throw new HttpException("Faild to like the post", HttpStatus.BAD_REQUEST)
        }
    }
}