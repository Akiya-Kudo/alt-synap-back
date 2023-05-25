import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './post.model';
import { upsertArticlePostInput, upsertArticlePostOutput } from 'src/custom_models/mutation.model';
import { Tag } from 'src/tag/tag.model';

@Resolver()
export class PostResolver {
    constructor(private postService: PostService) {}

    @Mutation(() => upsertArticlePostOutput, { name: "upsert_article_post"})
    async upsertArticlePost(@Args('postData') postData: upsertArticlePostInput) {
        return this.postService.upsertArticlePost(postData);
    }
}
