import { Field, ID, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { LinkCollection } from '../link_collection/link_collection.model';
import { User } from '../user/user.model';

@ObjectType()
export class Collection {
    @Field( type => Int )
    cid: number;

    @Field({ nullable: true })
    uuid_uid?: string;

    @Field({ nullable: true })
    collection_name: string;

    @Field({ nullable: true })
    deleted?: boolean;


    @Field( type => User, { nullable: true })
    users?: User;


    @Field( type => [LinkCollection], { nullable: true } )
    link_collections?: LinkCollection[];
}