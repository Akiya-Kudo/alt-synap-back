import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { upsertArticlePostInput, upsertLinkPostInput } from 'src/custom_models/mutation.model';
import {v4 as uuid_v4} from 'uuid'
import { posts, Prisma } from '@prisma/client';
import { Post } from './post.model';
import { log } from 'console';
import { PostWithTagsAndUserAndTotalCount } from 'src/custom_models/query.model';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}


    async findPost ( uuid_pid: string, uid_token: string ): Promise<Post> {
        try {
            let _uuid_uid = undefined
            if (uid_token) {
                // get uuid_uid
                const { uuid_uid } = await this.prisma.users.findUniqueOrThrow({
                    where: { uid: uid_token },
                    select: { uuid_uid: true }
                })
                _uuid_uid = uuid_uid
            }
            const data = await this.prisma.posts.findUnique({
                where: {
                    uuid_pid: uuid_pid
                },
                include: {
                    users: true,
                    article_contents: true,
                    post_tags: { include: { tags: true } },
                    likes: _uuid_uid ? { where: { uuid_uid: _uuid_uid }} : { take: 0 }
                }
            })
            
            if (data.deleted) throw new HttpException("post is already deleted", HttpStatus.BAD_REQUEST)
            if (!data.publish) {
                if (uid_token == data.users.uid) console.log("authentication success")
                else throw new HttpException("requesting user is not avalable to get post", HttpStatus.BAD_REQUEST)
            }
            return ({
                ...data,
                users: {
                    ...data.users,
                    uid: undefined
                },
                article_contents: data.article_contents ? data.article_contents : undefined
            })
        } catch (error) {
            throw error
        }
    }

    async searchPostFromTitleAndTags (
        words: string[], 
        selected_tid: number | null,
        offset: number,
        sort_type_num: number,
        uid_token: string | null
    ) : Promise<Post[]>{
        try {
            let _uuid_uid = undefined
            if (uid_token) {
                // get uuid_uid
                const { uuid_uid } = await this.prisma.users.findUniqueOrThrow({
                    where: { uid: uid_token },
                    select: { uuid_uid: true }
                })
                _uuid_uid = uuid_uid
            }
            const words_conditions = (words && words.length!=0) 
            ? words.map( word => ({ title_tags_search_text: { contains: word }}) ) 
            : []

            const sort_conditions: Prisma.postsOrderByWithRelationAndSearchRelevanceInput[] =
                sort_type_num == 0 ? [{ likes_num: "desc" }] : [{ timestamp: "desc" }];

            return await this.prisma.posts.findMany({
                where: {
                    deleted: false,
                    publish: true,
                    AND: words_conditions.length!=0 ? words_conditions : undefined,
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
                    publish: true,
                    deleted: true,
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
                    likes: _uuid_uid ? { where: { uuid_uid: _uuid_uid }} : { take: 0 }
                },
                orderBy: sort_conditions,
                take: 20,
                skip: offset
            })
        } catch ( error ) {
            console.log(error);
            
            throw new HttpException("Faild to seatch Post", HttpStatus.BAD_REQUEST)
        }
    }

    async countTotalPosts(words: string[], selected_tid: number | null) : Promise<number>{
        const words_conditions = (words && words.length!=0) 
            ? words.map( word => ({ title_tags_search_text: { contains: word }}) ) 
            : []
        try {
            return this.prisma.posts.count({
                where: {
                    deleted: false,
                    publish: true,
                    AND: words_conditions.length!=0 ? words_conditions : undefined,
                    post_tags: selected_tid ? { some: {tid: selected_tid} } : undefined
                }
            })
        } catch ( error ) {
            throw new HttpException("Faild to count total hit Posts", HttpStatus.BAD_REQUEST)
        }
    }

    async findPostsMadeByUser (
        uuid_uid: string, 
        selected_tids: number[],
        offset: number,
        uid_token: string | null
    ) : Promise<Post[]>{
        try {
            let _uuid_uid = undefined
            if (uid_token) {
                // get uuid_uid
                const { uuid_uid } = await this.prisma.users.findUniqueOrThrow({
                    where: { uid: uid_token },
                    select: { uuid_uid: true }
                })
                _uuid_uid = uuid_uid
            }
            //the case uuid_uid gotten by uid_token is same with the arg's uuid_uid, get posts include unpublished
            return this.prisma.posts.findMany({
                where: {
                    uuid_uid: uuid_uid,
                    post_tags: selected_tids.length!=0 ? { some: { tid: { in: selected_tids }}} : undefined,
                    publish: _uuid_uid && _uuid_uid == uuid_uid ? undefined : true,
                    deleted: false
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
                    publish: true,
                    deleted: true,
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
                    likes: _uuid_uid ? { where: { uuid_uid: _uuid_uid }} : { take: 0 }
                },
                orderBy: { timestamp: "desc" },
                take: 5,
                skip: offset
            })
        } catch(error) {
            throw error
        }
    }

    async countTotalPostsMadeByUser(
        uuid_uid: string, 
        selected_tids: number[],
        uid_token: string | null
    ) : Promise<number>{
        try {
            let _uuid_uid = undefined
            if (uid_token) {
                // get uuid_uid
                const { uuid_uid } = await this.prisma.users.findUniqueOrThrow({
                    where: { uid: uid_token },
                    select: { uuid_uid: true }
                })
                _uuid_uid = uuid_uid
            }

            return this.prisma.posts.count({
                where: {
                    uuid_uid: uuid_uid,
                    post_tags: selected_tids.length!=0 ? { some: { tid: { in: selected_tids }}} : undefined,
                    publish: _uuid_uid && _uuid_uid == uuid_uid ? undefined : true,
                    deleted: false
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

                if (postData.uuid_pid == null || postData.uuid_pid == undefined ) {
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
            throw new HttpException("Faild to Upsert Article Post", HttpStatus.BAD_REQUEST)
        }
    }

    async upsertLinkPost (postData: upsertLinkPostInput, uid_token: string) {
        try {
            const transaction = await this.prisma.$transaction(async (prisma) => {
                //separate variables
                let { uuid_pid, title, top_link, publish, content_type } = postData
                //set title lower
                const title_lower = title.toLowerCase()
                let post = null as posts
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
                            top_link,
                            content_type,
                            publish,
                        }
                    })
                    log("created new link post")
                } else {
                    // check if the post is exists
                    const post_before = await prisma.posts.findUniqueOrThrow({
                        where: { uuid_pid: uuid_pid },
                        include: { users: { select: {
                            uid: true,
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
                            top_link,
                            publish
                        },
                    })
                    log("updated new link post")
                }

                let res_post = {...post} as Post
                log(post)
                return ({post: res_post} )
            })
            return transaction
            //uidからuuid_uidを取得できない場合には
        } catch ( error ) {
            log(error)
            throw new HttpException("Faild to Upsert Link Post", HttpStatus.BAD_REQUEST)
        }
    }
}