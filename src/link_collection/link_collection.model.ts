import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Collection } from '../collection/collection.model';
import { Link } from '../link/link.model';
import { Post } from '../post/post.model';
import { User } from '../user/user.model';

@ObjectType()
export class LinkCollection {
    @Field( type => ID)
    cid?: number;

    @Field( type => ID )
    lid?: number;

    @Field({ nullable: true })
    uuid_uid?: string;

    @Field( type => Boolean, { nullable: true })
    deleted?: boolean;


    @Field( type => User, { nullable: true })
    users?: User;


    @Field( type => Collection, { nullable: true })
    collections?: Collection;
    
    @Field( type => Link, { nullable: true })
    links?: Link;
}