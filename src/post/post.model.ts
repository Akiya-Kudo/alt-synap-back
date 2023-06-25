import { Field, GraphQLISODateTime, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ArticleContent } from 'src/article_content/article_content.model';
import { Like } from 'src/like/like.model';
import { PostTag } from 'src/posts_tag/posts_tag.model';
import { SourceContent } from 'src/source_content/source_content.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class Post {
  @Field( type => ID )
  uuid_pid: string;

  @Field({ nullable: true })
  uuid_uid: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  title_lower: string;

  @Field({ nullable: true })
  top_image: string;

  @Field({ nullable: true })
  top_link: string;

  @Field( type => Int, { nullable: true })
  content_type: number;

  @Field( type => Int, { nullable: true })
  likes_num: number;

  @Field( type => GraphQLISODateTime, { nullable: true })
  timestamp: Date;

  @Field( type => Boolean, { nullable: true })
  publish: boolean;

  @Field( type => Boolean, { nullable: true })
  deleted: boolean;


  @Field( type => User, { nullable: true })
  users: User

  @Field( type => ArticleContent, { nullable: true })
  article_contents: ArticleContent;

  @Field( type => SourceContent, { nullable: true })
  source_contents: SourceContent;


  @Field( type => [PostTag], {nullable: true })
  post_tags: PostTag[];

  @Field( type => [Like], { nullable: true })
  likes: Like[];
}