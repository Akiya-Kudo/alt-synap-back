import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LikeModel {
  @Field(() => Int )
  like_id: number;

  @Field(() => Int, { nullable: true })
  pid: number;

  @Field({ nullable: true })
  uid: string;
}
