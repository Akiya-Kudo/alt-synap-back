import { Field, ID, InputType, Int } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-scalars";

@InputType()
export class upsertPostInput {
    @Field( type => ID)
    uid: string;

    @Field( type => ID)
    pid_uuid: string;

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
export class updateUserInfoInput {
    @Field( type => ID)
    firebase_id: string;

    @Field({ nullable: true })
    user_name: string;

    @Field({ nullable: true })
    comment: string;

    @Field({ nullable: true })
    photo_url: string;

    @Field( type => Int, { nullable: true })
    lang_type: number;
}

@InputType()
export class createUserInfoInput {
    @Field( type => ID)
    firebase_id: string;

    @Field({ nullable: true })
    user_name: string;
}
