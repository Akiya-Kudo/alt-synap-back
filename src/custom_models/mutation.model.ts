import { Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-scalars";
import { ArticleContent } from "src/article_content/article_content.model";
import { Post } from "src/post/post.model";
import { Tag } from "src/tag/tag.model";
import { User } from "src/user/user.model";

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

@ObjectType()
export class upsertArticlePostOutput {
    @Field( type => Post )
    post: Post

    @Field( type => [Tag], { nullable: "items" })
    tags: Tag[]
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
    @Field( type => ID)
    uid: string;

    @Field( type => ID )
    uuid_uid: string;

    @Field( type => Int, { nullable: true })
    lang_type: number;
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