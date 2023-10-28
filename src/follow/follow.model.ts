import { Field, GraphQLISODateTime, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType()
export class Follow {
    @Field( type => ID )
    follower_uuid: string;

    @Field( type => ID)
    followee_uuid: string;

    @Field(()=> User, { nullable: true })
    users_follows_followee_uuidTousers?: User;

    @Field(()=> User, { nullable: true })
    users_follows_follower_uuidTousers?: User;
}

