import { Field, ID, InputType, Int } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-scalars";
import { ArticleContent } from "src/article_content/article_content.model";
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
    @Field( type => ID)
    uuid_uid: string;

    @Field( type => ID)
    uuid_pid: string;

    @Field(type => ID)
    uid: string;

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
export class updateUserInput {
    @Field( type => ID)
    uid: string;

    @Field( type => ID )
    uuid_uid: string;
    
    @Field({ nullable: true })
    comment: string;

    @Field( type => Int, { nullable: true })
    lang_type: number;
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
