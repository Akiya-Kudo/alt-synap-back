import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { upsertArticlePostInput } from 'src/custom_models/mutation.model';
import {v4 as uuid_v4} from 'uuid'
import { posts, Prisma } from '@prisma/client';
import { log } from 'console';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async upsertArticlePost(postData: upsertArticlePostInput) {

        //firebase auth アクセス制御

        // uid & uuid_uid　認証

        try {
            if (postData.uuid_pid==null || postData.uuid_pid==undefined) postData.uuid_pid = uuid_v4()
            const {uuid_pid, uuid_uid, title, top_image, top_link, content_type, publish, deleted} = postData
            const article_content = postData.articleContent
            const tags = postData.tags

            
            const transaction = await this.prisma.$transaction(async (prisma) => {
                //post table upsert
                const post = await prisma.posts.upsert({
                    where: {
                        uuid_pid: postData.uuid_pid
                    },
                    create: {
                        uuid_pid,
                        users: { connect: {uuid_uid: postData.uuid_uid} },
                        title,
                        top_image,
                        top_link,
                        content_type,
                        publish,
                        deleted,
                    },
                    update: {
                        uuid_pid,
                        uuid_uid,
                        title,
                        top_image,
                        top_link,
                        content_type,
                        publish,
                        deleted,
                    },
                })
                
                //article_content table upsert


                // tags table upsert


                // post_tags upsert


                // post_tags deleteMany
                console.log(post);
                return post
            });
            return transaction
        } catch ( error ) {
            throw new Error(error)
        }
    }
}