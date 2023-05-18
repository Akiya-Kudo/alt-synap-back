import { Field, ID, InputType, Int } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-scalars";
import { User } from "src/user/user.model";

@InputType()
export class upsertArticlePostInput {
    @Field( type => ID)
    uuid_uid: string;

    @Field( type => ID)
    uuid_pid: string;

    @Field()
    title: string;

    @Field( type => GraphQLJSONObject, { nullable: true })
    content: JSON;

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

    @Field( type => [String])
    tag_names: String[]
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
