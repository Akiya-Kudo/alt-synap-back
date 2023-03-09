import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Blog_contentModel {
  @Field(() => Int)
  pid: number;

  @Field( type => JSON, { nullable: true })
  content: object;
}
