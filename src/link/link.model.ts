import { Field, GraphQLISODateTime, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { LinkCollection } from '../link_collection/link_collection.model';
import { User } from '../user/user.model';

@ObjectType()
export class Link {
    @Field(type => Int)
    lid: number;

    @Field({ nullable: true })
    uuid_uid: string;

    @Field({ nullable: true })
    link_name: string;

    @Field({ nullable: true })
    image_path: string;

    @Field({ nullable: true })
    explanation: string;

    @Field({ nullable: true })
    url_scheme: string;

    @Field({ nullable: true })
    query: string;

    @Field({ nullable: true })
    joint: string;

    @Field({ nullable: true })
    other_queries: string;

    @Field(type => Int, { nullable: true })
    genre: number;

    @Field(type => Boolean, { nullable: true })
    is_path_search: boolean;

    @Field(type => Boolean, { nullable: true })
    publish: boolean;

    @Field( type => GraphQLISODateTime, { nullable: true })
    timestamp?: Date;


    @Field( type => User, { nullable: true })
    users?: User;


    @Field( type => [LinkCollection], { nullable: true } )
    link_collections?: LinkCollection[];
}