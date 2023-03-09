import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostModel {
  @Field( type => Int )
  pid: number;

  @Field({ nullable: true })
  pid_uuid: string;

  @Field({ nullable: true })
  uid: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  top_image: string;

  @Field({ nullable: true })
  top_link: string;

  @Field( type => Int, { nullable: true })
  content_type: number;

  @Field( type => Int, { nullable: true })
  likes_num: number;

  @Field( type => GraphQLISODateTime, { nullable: true })
  update_time: Date;

  @Field( type => Boolean, { nullable: true })
  publish: boolean;

  @Field( type => Boolean, { nullable: true })
  deleted: boolean;
}
