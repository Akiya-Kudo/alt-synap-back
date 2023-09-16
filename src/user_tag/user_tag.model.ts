import { Field, GraphQLISODateTime, ID, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { LinkCollection } from 'src/link_collection/link_collection.model';
import { Post } from 'src/post/post.model';
import { Tag } from 'src/tag/tag.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class UserTag {
    @Field( type => Int, { nullable: true })
    tid?: number;

    @Field({ nullable: true })
    uuid_uid?: string;

    @Field( type => GraphQLISODateTime, { nullable: true })
    timestamp?: Date;

    
    @Field( type => Tag, { nullable: true } )
    tags?: Tag;

    @Field( type => User, { nullable: true })
    users?: User;
}