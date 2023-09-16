import { Field, GraphQLISODateTime, ID, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { FolderPost } from 'src/folder_post/folder_post.model';
import { LinkCollection } from 'src/link_collection/link_collection.model';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class Folder {
    @Field( type => Int )
    fid: number;

    @Field({ nullable: true })
    uuid_uid?: string;

    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    top_image?: string;

    @Field( type => GraphQLISODateTime, { nullable: true })
    timestamp?: Date;


    @Field( type => [FolderPost], { nullable: true })
    folder_posts?: FolderPost[];

    @Field( type => User, { nullable: true })
    users?: User;
}