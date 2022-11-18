import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field({ nullable: true })
  firebase_id: string;

  @Field()
  user_name: string;

  @Field()
  photo_url: string;

  @Field()
  comment: string;

  @Field()
  pinterest_user_id: string;
}
