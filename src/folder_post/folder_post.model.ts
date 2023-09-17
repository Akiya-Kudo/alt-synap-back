import { Field, GraphQLISODateTime, ID, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { Folder } from 'src/folder/folder.model';
import { Post } from 'src/post/post.model';

@ObjectType()
export class FolderPost {
    @Field( type => Int )
    fid: number;

    @Field()
    uuid_pid: string;

    @Field( type => GraphQLISODateTime, { nullable: true })
    timestamp?: Date;


    @Field( type => Folder, { nullable: true } )
    folders?: Folder;
    
    @Field( type => Post, { nullable: true })
    posts?: Post;
}