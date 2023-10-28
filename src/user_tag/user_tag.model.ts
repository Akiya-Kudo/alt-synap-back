import { Field, GraphQLISODateTime, ObjectType, Int } from '@nestjs/graphql';
import { Tag } from '../tag/tag.model';
import { User } from '../user/user.model';

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