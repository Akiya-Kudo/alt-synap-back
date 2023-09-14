import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/token.guard';
import { Like } from './like.model';
import { AuthService } from 'src/auth/auth.service';
import { Post } from 'src/post/post.model';

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
            console.log(error);
            
            throw new HttpException("Faild to like the post", HttpStatus.BAD_REQUEST)
        }
    }

    @Query(() => [Post],{ name: "get_likes_with_post" })
    @UseGuards(TokenGuard)
    async getLikesWithPost (
        @Args('selectedTagIds', { type: () => [Int], nullable: 'itemsAndList' }) selectedTagIds: number[] | null,
        @Args('offset', { type: () => Int }) offset: number,
        @Context() context
    ) {
        try {
            const uid_token: string | null = context.req.idTokenUser?.user_id

            const selectedTids = selectedTagIds ? selectedTagIds : []
            return await this.likeService.getUserLikesWithPost(selectedTids, offset, uid_token)
        } catch (error) {
            console.error(error);
            throw new HttpException("Faild to get Post liked by user", HttpStatus.BAD_REQUEST)
        }
    }
}