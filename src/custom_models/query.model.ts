import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "../post/post.model";
import { Tag } from "../tag/tag.model";
import { User } from "../user/user.model";

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