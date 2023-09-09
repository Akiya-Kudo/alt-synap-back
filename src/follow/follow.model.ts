import { Field, GraphQLISODateTime, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class Follow {
    @Field( type => ID )
    follower_uuid: string;

    @Field( type => ID)
    followee_uuid: string;

    @Field(()=> [User] )
    users_follows_followee_uuidTousers?: User[];

    @Field(()=> [User] )
    users_follows_follower_uuidTousers?: User[];
}

