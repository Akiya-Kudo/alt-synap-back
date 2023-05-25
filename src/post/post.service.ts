import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { upsertArticlePostInput } from 'src/custom_models/mutation.model';
import {v4 as uuid_v4} from 'uuid'
import { posts, Prisma } from '@prisma/client';
import { log } from 'console';
import { Post } from './post.model';
import { ArticleContent } from 'src/article_content/article_content.model';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async upsertArticlePost(postData: upsertArticlePostInput) {

        //firebase auth アクセス制御

        // uid & uuid_uid　認証

        try {
            if (postData.uuid_pid==null || postData.uuid_pid==undefined) postData.uuid_pid = uuid_v4()
            const {uuid_pid, uuid_uid, title, top_image, top_link, content_type, publish, deleted} = postData
            const article_content_object = postData.articleContent as object
            const tags = postData.tags
            let pts = [] as {tid: number, uuid_pid: string}[]

            const transaction = await this.prisma.$transaction(async (prisma) => {
                //post table upsert
                const post = await prisma.posts.upsert({
                    where: {
                        uuid_pid: postData.uuid_pid
                    },
                    create: {
                        uuid_pid,
                        users: { connect: {uuid_uid: uuid_uid} },
                        title,
                        top_image,
                        top_link,
                        content_type,
                        publish,
                        deleted,
                    },
                    update: {
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
                let article_content = await prisma.article_contents.upsert({
                    where: {
                        uuid_pid: postData.uuid_pid,
                    },
                    create:{
                        posts: { connect: {uuid_pid: uuid_pid} },
                        content: article_content_object
                    },
                    update: {
                        content: article_content_object
                    },
                })
                if (tags.length!=0) {
                // tags table insert
                    // insert tags only when not in db
                    await prisma.tags.createMany({
                        data: tags,
                        skipDuplicates: true
                    })
                    //get tags object (tid, tag_name)
                    const tag_names = tags.map(tag=>tag.tag_name)
                    const tags_in_db = await prisma.tags.findMany({
                        where: {
                            tag_name: {
                                in: tag_names
                            }
                        }
                    })
                // post_tags table insert
                    pts = tags_in_db.map(tag=>({
                        tid: tag.tid,
                        uuid_pid: uuid_pid
                    }))
                    await prisma.post_tags.createMany({
                        data: pts,
                        skipDuplicates: true
                    })
                }
                // post_tags deleteMany
                const tids = pts.map(pt=>pt.tid)
                await prisma.post_tags.deleteMany({
                    where: {
                        tid: { not: { in: tids } }
                    }
                })
                
                //response data shaping
                let res_post = {...post} as Post
                res_post.article_contents = article_content  as unknown as ArticleContent
                const res_tags = await prisma.tags.findMany({
                    where: {
                        tid: { in: tids }
                    }
                })
                const res = {post: res_post, tags: res_tags}
                return res
            });
            return transaction
        } catch ( error ) {
            throw new Error(error)
        }
    }
}