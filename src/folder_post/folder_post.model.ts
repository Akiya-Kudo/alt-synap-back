import { Field, GraphQLISODateTime, ID, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { Folder } from 'src/folder/folder.model';
import { LinkCollection } from 'src/link_collection/link_collection.model';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class FolderPost {
    @Field( type => Int )
    fid: number;

    @Field()
    uuid_pid?: string;

    @Field( type => GraphQLISODateTime, { nullable: true })
    timestamp?: Date;


    @Field( type => Folder, { nullable: true } )
    folders?: Folder;
    
    @Field( type => Post, { nullable: true })
    posts?: Post;
}