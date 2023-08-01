import { Field, ID, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { LinkCollection } from 'src/link_collection/link_collection.model';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class Collection {
    @Field( type => Int )
    cid: number;

    @Field({ nullable: true })
    uuid_uid: string;

    @Field({ nullable: true })
    collection_name: string;


    @Field( type => User, { nullable: true })
    users: User;


    @Field( type => [LinkCollection], { nullable: true } )
    link_collections: LinkCollection[];
}