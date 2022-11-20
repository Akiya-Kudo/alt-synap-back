import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Blog_contentModel {
  @Field(() => Int, { nullable: true })
  pid: number;

  @Field({ nullable: true })
  xml: string;
}
