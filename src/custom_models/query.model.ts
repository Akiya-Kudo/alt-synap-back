import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "src/post/post.model";
import { Tag } from "src/tag/tag.model";

// @InputType()
// export class SearchPostTagInput {
//     @Field({ nullable: true })
//     search_string: string;
// }
@ObjectType()
export class PostWithTags extends Post {
    @Field( type => [Tag], { nullable: 'itemsAndList' } )
    tags: Tag[]
}

@ObjectType()
export class PostWithTagsAndTotalCount extends PostWithTags {
    @Field( type => Int, { nullable: true } )
    total_count: bigint
}

@ObjectType()
export class searchPostOutput {
    @Field( type => [Post], { nullable: "items" })
    posts: Post[]

    @Field( type => Int, { nullable: true })
    total_count: number
}