import { Args, Context, GqlExecutionContext, Mutation, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './post.model';
import { upsertArticlePostInput, upsertArticlePostOutput } from 'src/custom_models/mutation.model';
import { Tag } from 'src/tag/tag.model';
import { HttpException, HttpStatus, UnauthorizedException, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/token.guard';
import { AuthService } from 'src/auth/auth.service';
import { log } from 'console';

@Resolver()
export class PostResolver {
    constructor(private postService: PostService,
        private authServise: AuthService) {}

    @Mutation(() => upsertArticlePostOutput, { name: "upsert_article_post"})
    @UseGuards(TokenGuard)
    async upsertArticlePost(
        @Args('postData') postData: upsertArticlePostInput,
        @Context() context
    ) {
        try {
            const uid_token = context.req.idTokenUser.user_id
            return this.postService.upsertArticlePost(postData, uid_token);
        } catch (error) {
            throw new HttpException("Faild to Upsert Post", HttpStatus.BAD_REQUEST)
        }
    }
}
