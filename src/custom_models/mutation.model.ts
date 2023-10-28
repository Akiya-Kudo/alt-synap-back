import { Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-scalars";
import { Post } from "../post/post.model";
import { Tag } from "../tag/tag.model";

@InputType()
class TagInput {
    @Field( type => Int,{ nullable: true })
    tid: number;

    @Field()
    tag_name: string;
}

@InputType()
class ArticleContentInput {
    @Field( type => GraphQLJSONObject)
    content: JSON;
}

@InputType()
export class upsertArticlePostInput {
    @Field( type => ID, { nullable: true })
    uuid_pid: string;

    @Field()
    title: string;
        
    @Field({ nullable: true })
    top_image: string;
    
    @Field({ nullable: true })
    top_link: string;
    
    @Field( type => Int )
    content_type: number;
    
    @Field( type => Boolean)
    publish: boolean;
    
    @Field( type => Boolean)
    deleted: boolean;
    
    @Field( type => [TagInput]!, { nullable: "items" })  //tags: [TagInput]!
    tags: TagInput[]
    
    @Field( type => ArticleContentInput)
    articleContent: ArticleContentInput;
}

@InputType()
export class upsertLinkPostInput {
    @Field( type => ID, { nullable: true })
    uuid_pid: string;

    @Field()
    title: string;
    
    @Field({ nullable: true })
    top_link: string;
    
    @Field( type => Int )
    content_type: number;
    
    @Field( type => Boolean)
    publish: boolean;
}

@ObjectType()
export class upsertArticlePostOutput {
    @Field( type => Post )
    post: Post
    
    @Field( type => [Tag], { nullable: "items" })
    tags: Tag[]
}

@ObjectType()
export class upsertLinkPostOutput {
    @Field( type => Post )
    post: Post
}

@InputType()
export class updateUserInput {
    @Field()
    user_name: string;

    @Field({nullable: true})
    user_image: string
    
    @Field({ nullable: true })
    comment: string;
}

@InputType()
export class createUserInput {
    @Field( type => ID )
    uuid_uid: string;

    @Field( type => Int, { nullable: true })
    lang_type: number;

    @Field({ nullable: true })
    user_name: string;

    @Field({ nullable: true })
    user_image: string;
}

@InputType()
export class createLinkInput {
    @Field()
    link_name: string;
        
    @Field({ nullable: true })
    image_path: string;
    
    @Field({ nullable: true })
    explanation: string;
    
    @Field()
    url_scheme: string;
    
    @Field({ nullable: true })
    query: string;
    
    @Field({ nullable: true })
    joint: string;
    
    @Field({ nullable: true })
    other_queries: string;

    @Field(type => Int)
    genre: number
    
    @Field( type => Boolean)
    publish: boolean;
    
    @Field( type => Boolean)
    is_path_search: boolean;
}


@InputType()
export class upsertFolderInput {
    @Field( type => Int, { nullable: true })
    fid: number | null;

    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    top_image?: string;
}