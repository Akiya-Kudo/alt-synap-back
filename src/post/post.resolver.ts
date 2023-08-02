import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { upsertArticlePostInput, upsertArticlePostOutput } from 'src/custom_models/mutation.model';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/token.guard';
import { AuthService } from 'src/auth/auth.service';
import { TagService } from 'src/tag/tag.service';
import { PostWithTagsAndUser } from 'src/custom_models/query.model';
import { Post } from './post.model';

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
            return await this.postService.upsertArticlePost(postData, uid_token)
        } catch (error) {
            throw new HttpException("Faild to Upsert Post", HttpStatus.BAD_REQUEST)
        }
    }

    @Query(() => [Post], { name: "search_post" })
    async searchPost(
        @Args('searchString') searchString: string,
        @Args('selectedTagId', { type: () => Int, nullable: true }) selectedTagId: number,
        @Args('offset', {type: () => Int}) offset:number,
        @Args('sortType', {type: () => Int}) sortType:number
    ) {
        try {
            //引数の整形 : ( 引数のString => lowerケース変換 => 空白で分類配列化 => exclude wordを除外 )
            const excludes = ["a", "and", "the", "are", "is"]
            const words = searchString.toLowerCase().replace(/　/g, ' ').split(' ').filter( word => word && !excludes.includes(word) )

            //posts search from title & selected tags 
            let res_posts = await this.postService.searchPostFromTitleAndTags(words, selectedTagId, offset, sortType);

            return res_posts
        } catch (error) {
            console.error(error);
            throw new HttpException("Faild to search Post by title", HttpStatus.BAD_REQUEST)
            
        }
    }

    @Query(() => Number, { name: "count_total_posts" })
    async countTotalPosts(
        @Args('searchString') searchString: string,
        @Args('selectedTagId', { type: () => Int, nullable: true }) selectedTagId: number
    ) {
        try {
            //引数の整形 : ( 引数のString => lowerケース変換 => 空白で分類配列化 => exclude wordを除外 )
            const excludes = ["a", "and", "the", "are", "is"]
            const words = searchString.toLowerCase().replace(/　/g, ' ').split(' ').filter( word => word && !excludes.includes(word) )

            //posts count from title & selected tags 
            return await this.postService.countTotalPosts(words, selectedTagId);
        } catch (error) {
            console.error(error);
            throw new HttpException("Faild to search Post by title", HttpStatus.BAD_REQUEST)
            
        }
    }
}
