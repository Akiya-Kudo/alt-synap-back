import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { upsertArticlePostInput } from 'src/custom_models/mutation.model';
import {v4 as uuid_v4} from 'uuid'
import { posts, Prisma } from '@prisma/client';
import { Post } from './post.model';
import { log } from 'console';
import { PostWithTagsAndUserAndTotalCount } from 'src/custom_models/query.model';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async searchPostFromTitleAndTags (
        words: string[], 
        selected_tid: number,
        offset: number,
        sort_type_num: number,
    ) : Promise<Post[]>{
        try {
            const words_conditions = words ? words.map( word => ({ title_tags_search_text: { contains: word }}) ) : []
            const sort_conditions: Prisma.postsOrderByWithRelationAndSearchRelevanceInput[] =
                sort_type_num == 0 ? [{ likes_num: "desc" }] : [{ timestamp: "desc" }];

            return await this.prisma.posts.findMany({
                where: {
                    deleted: false,
                    publish: true,
                    AND: words ? words_conditions : undefined,
                    post_tags: selected_tid ? { some: {tid: selected_tid} } : undefined
                },
                select: {
                    uuid_pid: true,
                    uuid_uid: true,
                    title: true,
                    top_link: true,
                    top_image: true,
                    timestamp: true,
                    likes_num: true,
                    content_type: true,
                    post_tags: {
                        select: {
                            tags: {
                                select: {
                                    tid: true,
                                    tag_name: true,
                                    display_name: true,
                                    tag_image: true
                                }
                            }
                        }
                    },
                    users: {
                        select: {
                            uuid_uid: true,
                            user_name: true,
                            user_image: true
                        }
                    },
                },
                orderBy: sort_conditions,
                take: 20,
                skip: offset
            })
        } catch ( error ) {
            throw new HttpException("Faild to seatch Post", HttpStatus.BAD_REQUEST)
        }
    }

    async countTotalPosts(words: string[], selected_tid: number) : Promise<number>{
        const words_conditions = words.map( word => ({ title_tags_search_text: { contains: word }}) )
        try {
            return this.prisma.posts.count({
                where: {
                    deleted: false,
                    publish: true,
                    AND: words ? words_conditions : undefined,
                    post_tags: selected_tid ? { some: {tid: selected_tid} } : undefined
                }
            })
        } catch ( error ) {
            throw new HttpException("Faild to count total hit Posts", HttpStatus.BAD_REQUEST)
        }
    }

    async upsertArticlePost(postData: upsertArticlePostInput, uid_token: string) {
        try {
            const transaction = await this.prisma.$transaction(async (prisma) => {
                //seperate the input values
                let {uuid_pid, title, top_image, top_link, content_type, publish, deleted} = postData
                const title_lower = title.toLowerCase()
                const article_content_input_object = postData.articleContent.content as object
                const tags_input = postData.tags
                // nested variables pre difinitions
                let post = null as posts
                let pts = [] as {tid: number, uuid_pid: string}[]
                let tags_newPost = [] as {tid: number, tag_name: string, tag_content_num: number}[]

                if (postData.uuid_pid == null || postData.uuid_pid == undefined) {
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
                            title_lower,
                            title_tags_search_text: title_lower,
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
                    // check if orner is same to token, for the case incorrect user tend to change other users posts
                    if (post_before.users.uid !== uid_token ) throw new HttpException("Orner ship is not correct", HttpStatus.FORBIDDEN)
                    // update post & article_content except for uuid_uid
                    post = await prisma.posts.update({
                        where: {
                            uuid_pid: uuid_pid
                        },
                        data: {
                            title,
                            title_lower,
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
                    .map(tag_name=>({
                        tag_name: tag_name,
                        display_name: tag_name,
                    }))

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


//前の生クエリの実装れい
            // const word_conditions = words.map((word, _i) =>  Prisma.sql` AND p.title_tags_search_text LIKE likequery(${words[_i]}) `)

            // const tag_query = Prisma.sql`SELECT p.uuid_pid 
            // FROM posts AS p 
            // LEFT JOIN post_tags AS pt ON p.uuid_pid = pt.uuid_pid 
            // WHERE pt.tid = ${ selected_tid && selected_tid }
            // GROUP BY p.uuid_pid
            // HAVING COUNT(DISTINCT pt.tid) = ${ selected_tid ? 1 : 0 }`

            // const sort_condition = sort_type_num == 0 ? Prisma.sql`ORDER BY p.likes_num DESC` : Prisma.sql`ORDER BY p.timestamp DESC`

            // const execute_sql = 
            // Prisma.sql`
            // SELECT
            //     p.uuid_pid, 
            //     p.uuid_uid, 
            //     p.title,
            //     p.top_link, 
            //     p.top_image, 
            //     p.timestamp,
            //     p.likes_num,
            //     JSON_AGG(JSON_BUILD_OBJECT( 'tid', t.tid, 'tag_name', t.tag_name, 'display_name', t.display_name, 'tag_image', t.tag_image )) AS tags,
            //     JSON_BUILD_OBJECT( 'uuid_uid', u.uuid_uid, 'user_name', u.user_name, 'user_image', u.user_image ) AS users,
            //     COUNT(*) OVER() as total_count
            // FROM posts AS p
            // LEFT JOIN post_tags AS pt ON p.uuid_pid = pt.uuid_pid
            // LEFT JOIN tags AS t ON pt.tid = t.tid
            // JOIN users AS u ON p.uuid_uid = u.uuid_uid
            // WHERE p.deleted = FALSE
            // AND p.publish = TRUE 
            // ${ words.length > 0 ? Prisma.join(word_conditions, '') : Prisma.sql`` }
            // ${ selected_tid ? Prisma.sql` AND p.uuid_pid IN (${tag_query}) ` : Prisma.sql`` }
            // GROUP BY p.uuid_pid, u.uuid_uid, u.user_name, u.user_image
            // ${ sort_condition } 
            // LIMIT 20 OFFSET ${ offset } * 20;
            // ` 
            // return await this.prisma.$queryRaw(execute_sql, ...words, selected_tid, offset)