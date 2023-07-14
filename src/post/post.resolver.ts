import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { upsertArticlePostInput, upsertArticlePostOutput } from 'src/custom_models/mutation.model';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/token.guard';
import { AuthService } from 'src/auth/auth.service';
import { TagService } from 'src/tag/tag.service';
import { searchPostOutput } from 'src/custom_models/query.model';

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

    @Query(() => searchPostOutput, { name: "search_post" })
    async searchPost(
        @Args('searchString') searchString: string,
        @Args('selectedTagIds', { type: () => [Int], nullable: 'items' }) selectedTagIds: number[],
        @Args('pgNum', {type: () => Int}) pgNum:number,
        @Args('sortType', {type: () => Int}) sortType:number
    ) {
        try {
            //引数の整形 : ( 引数のString => lowerケース変換 => 空白で分類配列化 => exclude wordを除外 )
            const excludes = ["a", "and", "the", "are", "is"]
            const words = searchString.toLowerCase().replace(/　/g, ' ').split(' ').filter( word => word && !excludes.includes(word) )

            //posts search from title & selected tags 
            let res_posts = await this.postService.searchPostFromTitleAndTags(words, selectedTagIds, pgNum, sortType);
            
            //result posts total_countのその値を取得しPostから削除
            let total_count = 0;
            if (res_posts.length > 0) total_count = Number(res_posts[0].total_count)
            res_posts =res_posts.map(post => {
                delete post.total_count
                return post
            })

            return {
                posts: res_posts,
                total_count
            }
        } catch (error) {
            console.error(error);
            throw new HttpException("Faild to search Post by title", HttpStatus.BAD_REQUEST)
            
        }
    }
}
