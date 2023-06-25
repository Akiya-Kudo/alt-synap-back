import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { upsertArticlePostInput, upsertArticlePostOutput } from 'src/custom_models/mutation.model';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/token.guard';
import { AuthService } from 'src/auth/auth.service';
import { searchPostTagOutput } from 'src/custom_models/query.model';
import { Tag } from 'src/tag/tag.model';
import { log } from 'console';
import { Post } from './post.model';
import { PostsTagService } from 'src/posts_tag/posts_tag.service';
import { TagService } from 'src/tag/tag.service';

@Resolver()
export class PostResolver {
    constructor(
        private postService: PostService,
        private tagService: TagService,
        private authServise: AuthService) {} //これいる？？消して良い？？

    @Mutation(() => upsertArticlePostOutput, { name: "upsert_article_post"})
    @UseGuards(TokenGuard)
    async upsertArticlePost(
        @Args('postData') postData: upsertArticlePostInput,
        @Context() context
    ) {
        try {
            const uid_token = context.req.idTokenUser.user_id
            return this.postService.upsertArticlePost(postData, uid_token)
        } catch (error) {
            throw new HttpException("Faild to Upsert Post", HttpStatus.BAD_REQUEST)
        }
    }

    @Query(() => [Post], { name: "search_post_tag" })
    async searchPostTag(
        @Args('searchString') searchString: string,
        @Args('selectedTagIds', { type: () => [Int], nullable: 'items' }) selectedTagIds: number[],
        @Args('pgNum', {type: () => Int}) pgNum:number,
        @Args('sortType', {type: () => Int}) sortType:number
    ) {
        try {
            //引数のString => lowerケース変換 => 空白で分類配列化 => exclude wordを除外
            const excludes = ["a", "and", "the", "are", "is"]
            const words = searchString.toLowerCase().replace(/　/g, ' ').split(' ').filter( word => word && !excludes.includes(word) )

            const res_posts = await this.postService.searchTitle(words, selectedTagIds, pgNum, sortType);
            // const res_tags = this.tagService.searchTags();
            console.log(res_posts);
            
            return res_posts
        } catch (error) {
            throw new HttpException("Faild to search Post by title", HttpStatus.BAD_REQUEST)
        }
    }
}
