import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LikeModel {
  @Field(() => Int )
  lid: number;

  @Field(() => Int, { nullable: true })
  pid: number;

  @Field({ nullable: true })
  uid: string;
}
