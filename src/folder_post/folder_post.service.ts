import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server-express';
import { log } from 'console';
import { PrismaService } from '../_prisma/prisma.service';

@Injectable()
export class FolderPostService {
    constructor (
        private prisma: PrismaService
    ) {}

    async findFolderPosts (
        fid: number,
        offset: number,
        uid_token: string
    ) {
        try {
            const folder = await this.prisma.folders.findUniqueOrThrow({
                where: { fid: fid },
                select: {
                    users: { select: { uid: true, uuid_uid: true }}
                }
            })
            if (!(uid_token && uid_token == folder.users.uid)) throw new AuthenticationError("the sended fid is not allowed to get by the id")
            const res = await this.prisma.folder_posts.findMany({
                where: { 
                    fid: fid,
                    posts: { deleted: false }
                },
                include: {
                    posts: {
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
                            likes: { where: { uuid_uid: folder.users.uuid_uid }},
                            folder_posts:  { where: { uuid_uid: folder.users.uuid_uid }}
                        }
                    }
                },
                orderBy: { timestamp: "desc" },
                take: 2,
                skip: offset
            })
            return res
        } catch (error) {throw error}
    }

    async countFolderPosts (
        fid: number,
        uid_token: string
    ) {
        try {
            const folder = await this.prisma.folders.findUniqueOrThrow({
                where: { fid: fid },
                select: {
                    users: { select: { uid: true, uuid_uid: true }}
                }
            })
            if (!(uid_token && uid_token == folder.users.uid)) throw new AuthenticationError("the sended fid is not allowed to get by the id")
            return this.prisma.folder_posts.count({
                where: { 
                    fid: fid,
                    posts: { deleted: false }
                },
            })
        } catch (error) { throw error }
    }

    async createFolderPosts (
        fid: number,
        uuid_pids: string[],
        uid_token: string
    ) {
        try {
            const folder = await this.prisma.folders.findUniqueOrThrow({
                where: { fid: fid },
                select: { users: { select: { uid: true, uuid_uid: true }}}
            })
            if (!(uid_token && uid_token == folder.users.uid)) throw new AuthenticationError("the sended fid is not allowed to modify by the id")
            const newFolderPosts =  uuid_pids.map((uuid_pid) =>  ({fid: fid, uuid_pid: uuid_pid, uuid_uid: folder.users.uuid_uid }))
            const res = await this.prisma.folder_posts.createMany({
                data: newFolderPosts
            })
            return newFolderPosts
        } catch (error) {throw error}
    }

    async deleteFolderPosts (
        fid: number,
        uuid_pids: string[],
        uid_token: string
    ) {
        try {
            const folder = await this.prisma.folders.findUniqueOrThrow({
                where: { fid: fid },
                select: { users: { select: { uid: true, uuid_uid: true }}}
            })
            if (!(uid_token && uid_token == folder.users.uid)) throw new AuthenticationError("the sended fid is not allowed to modify by the id")
            const res = await this.prisma.folder_posts.deleteMany({
                where: {
                    fid: fid,
                    uuid_pid: { in: uuid_pids }
                }
            })
            if (res.count == 0) throw new NotFoundException("find no record be hit in request post's id array, no record's are deleted")
            return (uuid_pids.map(uuid_pid => ({ fid, uuid_pid, uuid_uid: folder.users.uuid_uid })))
        } catch (error) {throw error}
    }
}
