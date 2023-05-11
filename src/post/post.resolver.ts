import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post, createPostInput } from './post.model';

@Resolver()
export class PostResolver {
    constructor(private postService: PostService) {}

    @Mutation(() => Post)
    async createPost(@Args('createPost') createPost: createPostInput) {
        console.log(createPost.uid);
        return this.postService.createPost(createPost);
    }
}