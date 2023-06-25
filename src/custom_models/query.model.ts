import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Post } from "src/post/post.model";
import { Tag } from "src/tag/tag.model";

// @InputType()
// export class SearchPostTagInput {
//     @Field({ nullable: true })
//     search_string: string;
// }

@ObjectType()
export class searchPostTagOutput {
    @Field( type => [Post], { nullable: "items" })
    posts: Post[]

    @Field( type => [Tag], { nullable: "items" })
    tags: Tag[]
}