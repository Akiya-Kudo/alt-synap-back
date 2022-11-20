import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Posts_tagModel {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => Int, { nullable: true })
  pid: number;

  @Field(() => Int, { nullable: true })
  tid: number;
}
