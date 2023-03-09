import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Source_content {
  @Field(() => Int)
  pid: number;

  @Field({ nullable: true })
  source_link: string;

  @Field(type => Int, { nullable: true })
  source_type: number;

  @Field( type => JSON, { nullable: true })
  description: object;
}
