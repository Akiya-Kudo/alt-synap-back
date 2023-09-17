import { Injectable } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server-express';
import { log } from 'console';
import { PrismaService } from 'src/_prisma/prisma.service';

@Injectable()
export class FolderPostService {
    constructor (
        private prisma: PrismaService
    ) {}

    async createFolderPosts (
        fid: number,
        uuid_pids: string[],
        uid_token: string
    ) {
        try {
            const folder = await this.prisma.folders.findUniqueOrThrow({
                where: { fid: fid },
                select: { users: { select: { uid: true }}}
            })
            if (!(uid_token && uid_token == folder.users.uid)) throw new AuthenticationError("the sended fid is not allowed to modify by the id")
            const newFolderPosts =  uuid_pids.map((uuid_pid) =>  ({fid: fid, uuid_pid: uuid_pid}))
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
                select: { users: { select: { uid: true }}}
            })
            if (!(uid_token && uid_token == folder.users.uid)) throw new AuthenticationError("the sended fid is not allowed to modify by the id")
            const res = await this.prisma.folder_posts.deleteMany({
                where: {
                    fid: fid,
                    uuid_pid: { in: uuid_pids }
                }
            })
            return res.count
        } catch (error) {throw error}
    }
}
