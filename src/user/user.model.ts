import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Collection } from 'src/collection/collection.model';
import { Folder } from 'src/folder/folder.model';
import { FolderPost } from 'src/folder_post/folder_post.model';
import { Follow } from 'src/follow/follow.model';
import { Like } from 'src/like/like.model';
import { Link } from 'src/link/link.model';
import { LinkCollection } from 'src/link_collection/link_collection.model';
import { Post } from 'src/post/post.model';
import { UserTag } from 'src/user_tag/user_tag.model';

// modelでのnullableは一括してID以外にオプションとしてつけています。処理を記述していき、不具合が主じたらその度変更していきます。
// リレーションを親に子のオブジェクトの配列を持たせることで表示させます。

@ObjectType()
export class User {
  @Field( type => ID, { nullable: true })
  uid?: string;

  @Field( type => ID, { nullable: true })
  uuid_uid?: string;

  @Field({ nullable: true })
  user_name?: string;

  @Field({ nullable: true })
  user_image?: string;

  @Field({ nullable: true })
  comment?: string;

  @Field( type => Int, { nullable: true})
  followee_num?: number;

  @Field( type => Int, { nullable: true })
  follower_num?: number;

  @Field( type => Int, { nullable: true })
  lang_type?: number;

  @Field( type => Int, {nullable: true})
  top_collection?: number;


  @Field( type => [Post], { nullable: true })
  posts?: Post[];

  @Field( type => [Like], { nullable: true })
  likes?: Like[];

  @Field( type => [Link], { nullable: true })
  links?: Link[];
  
  @Field( type => [Collection], { nullable: true })
  collections?: Collection[];

  @Field( type => [LinkCollection], { nullable: true })
  link_collections?: LinkCollection[];

  @Field( type => [Follow], { nullable: true })
  follows_follows_followee_uuidTousers?: Follow[]

  @Field( type => [Follow], { nullable: true })
  follows_follows_follower_uuidTousers?: Follow[]

  @Field(type => [Folder], { nullable: true })
  folders?: Folder[]

  @Field(type => [FolderPost], { nullable: true })
  fodler_posts?: FolderPost[]

  @Field(type => [UserTag], {nullable: true})
  user_tags?: UserTag[];
}