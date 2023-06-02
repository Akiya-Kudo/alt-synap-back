import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { upsertArticlePostInput } from 'src/custom_models/mutation.model';
import {v4 as uuid_v4} from 'uuid'
import { posts, Prisma } from '@prisma/client';
import { Post } from './post.model';
import { ArticleContent } from 'src/article_content/article_content.model';
import { log } from 'console';
import { throwError } from 'rxjs';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async upsertArticlePost(postData: upsertArticlePostInput, uid_token: string) {
        try {
            const transaction = await this.prisma.$transaction(async (prisma) => {
                //seperate the input values
                let {uuid_pid, title, top_image, top_link, content_type, publish, deleted} = postData
                const article_content_input_object = postData.articleContent.content as object
                const tags_input = postData.tags
                // nested variables pre difinitions
                let post = null as posts
                let pts = [] as {tid: number, uuid_pid: string}[]
                let tags_newPost = [] as {tid: number, tag_name: string, tag_content_num: number}[]

                if (postData.uuid_pid==null || postData.uuid_pid==undefined) {
                // create post
                    // get uuid_uid
                    const { uuid_uid } = await prisma.users.findUniqueOrThrow({
                        where: { uid: uid_token },
                        select: { uuid_uid: true }
                    })
                    //generate uuid_pid
                    uuid_pid = uuid_v4()
                    //create post & article_content
                    post = await prisma.posts.create({
                        data: {
                            uuid_pid,
                            users: { connect: {uuid_uid: uuid_uid} },
                            title,
                            top_image,
                            top_link,
                            content_type,
                            publish,
                            deleted,
                            article_contents: { 
                                create: { content: article_content_input_object } 
                            }
                        },
                        include: { article_contents: { select: { content: true } } }
                    })
                } else {
                    // check if the post is exists
                    const post_before = await prisma.posts.findUniqueOrThrow({
                        where: { uuid_pid: uuid_pid },
                        include: { users: { select: {
                            uid: true,
                            uuid_uid: true
                        }}}
                    })
                    // check if orner is same to token
                    if (post_before.users.uid !== uid_token ) throw new HttpException("Orner ship is not correct", HttpStatus.FORBIDDEN)
                    // update post & article_content except for uuid_uid
                    post = await prisma.posts.update({
                        where: {
                            uuid_pid: uuid_pid
                        },
                        data: {
                            title,
                            top_image,
                            top_link,
                            content_type,
                            publish,
                            deleted,
                            article_contents: {
                                update: { content: article_content_input_object },
                            }
                        },
                        include: { article_contents: { select: { content: true } } }
                    })
                }

                if (tags_input.length!=0) {
                // tags table insert
                    // insert tags only when not in db
                    const tag_names_input = tags_input.map(tag=>tag.tag_name)
                    const tags_in_before = await prisma.tags.findMany({
                        where: {
                            tag_name: {
                                in: tag_names_input
                            }
                        }
                    })
                    const tag_names_in_before = tags_in_before.map(tag=>tag.tag_name)
                    const tags_not_in_db = tag_names_input
                    .filter(tag_name=>!tag_names_in_before.includes(tag_name))
                    .map(tag_name=>({tag_name: tag_name}))
                    await prisma.tags.createMany({
                        data: tags_not_in_db,
                        skipDuplicates: true  //例外時用に定義 skip時にもtidのincrementが増加するため tags_not_in_dbによりskipを回避
                    })
                    //get tags object  & tid
                    tags_newPost = await prisma.tags.findMany({
                        where: {
                            tag_name: {
                                in: tag_names_input
                            }
                        }
                    })

                // post_tags insert skip if already exist
                    pts = tags_newPost.map(tag=>({
                        tid: tag.tid,
                        uuid_pid: uuid_pid
                    }))
                    await prisma.post_tags.createMany({
                        data: pts,
                        skipDuplicates: true,
                    })
                }
                // post_tags deleteMany whitch deleted from new post
                const tids = pts.map(pt=>pt.tid)
                await prisma.post_tags.deleteMany({
                    where: {
                        tid: { not: { in: tids } },
                        uuid_pid: uuid_pid,
                    }
                })
                
                //response data shaping
                let res_post = {...post} as Post
                log(post)
                const res_tags = tags_newPost
                // const res_tags = await prisma.tags.findMany({where: {tid: { in: tids }}})
                const res = {post: res_post, tags: res_tags}
                return res
            });
            return transaction
        } catch ( error ) {
            log(error)
            throw new HttpException("Faild to Upsert Post", HttpStatus.BAD_REQUEST)
        }
    }
}