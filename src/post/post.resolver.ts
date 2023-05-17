import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './post.model';
import { upsertPostInput } from 'src/custom_models/mutation.model';

@Resolver()
export class PostResolver {
    constructor(private postService: PostService) {}

    @Mutation(() => Post)
    async upsertPost(@Args('upsertPostValue') upsertPostValue: upsertPostInput) {
        console.log(upsertPostValue.uid);
        return this.postService.upsertPost(upsertPostValue);
    }
}