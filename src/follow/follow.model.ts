import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FollowModel {
  @Field(() => Int )
  follow_id: number;

  @Field({ nullable: true })
  followee_id: string;

  @Field({ nullable: true })
  follower_id: string;
}
