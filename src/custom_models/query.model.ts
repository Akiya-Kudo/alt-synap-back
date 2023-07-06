import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "src/post/post.model";
import { Tag } from "src/tag/tag.model";
import { User } from "src/user/user.model";

@ObjectType()
export class PostWithTagsAndUser extends Post {
    @Field( type => [Tag], { nullable: 'itemsAndList' } )
    tags: Tag[]

    @Field( type => User, { nullable: true } )
    user: User
}

@ObjectType()
export class PostWithTagsAndUserAndTotalCount extends PostWithTagsAndUser {
    @Field( type => Int, { nullable: true } )
    total_count: bigint
}

@ObjectType()
export class searchPostOutput {
    @Field( type => [PostWithTagsAndUser], { nullable: "items" })
    posts: PostWithTagsAndUser[]

    @Field( type => Int, { nullable: true })
    total_count: number
}