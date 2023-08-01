import { Field, ID, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { Collection } from 'src/collection/collection.model';
import { Link } from 'src/link/link.model';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class LinkCollection {
    @Field( type => ID)
    cid: number;

    @Field( type => ID )
    lid: number;

    @Field({ nullable: true })
    uuid_uid: string;

    @Field( type => Boolean, { nullable: true })
    deleted: boolean;


    @Field( type => User, { nullable: true })
    users: User;


    @Field( type => Collection, { nullable: true })
    collections: Collection;
    
    @Field( type => Link, { nullable: true })
    links: Link;
}