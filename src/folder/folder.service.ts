import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { AuthenticationError } from 'apollo-server-express';
import { upsertFolderInput } from 'src/custom_models/mutation.model';

@Injectable()
export class FolderService {
    constructor(private prisma: PrismaService) {}

    async upsertFolder(folderData: upsertFolderInput, uid_token: string) {
        try {
            const { fid, title, top_image } = folderData
            const { uuid_uid } = await this.prisma.users.findUniqueOrThrow({
                where: { uid: uid_token },
                select: { uuid_uid: true }
            })
            if (fid) {
                const folder = await this.prisma.folders.findUniqueOrThrow({ where: { fid: fid }})
                if (folder.fid && uuid_uid === folder.uuid_uid) {
                    return await this.prisma.folders.update({
                        where: { fid: fid },
                        data: {
                            title,
                            top_image
                        }
                    })
                } else throw new AuthenticationError("request id's authentication faild")
            } else {
                return await this.prisma.folders.create({
                    data: {
                        title,
                        top_image,
                        uuid_uid,
                    }
                })
            }
        } catch (error) { throw error }
    }

    async deleteFolder (fid: number, uid_token: string) {
        try {
            const transaction = await this.prisma.$transaction(async (prisma) => {
                const folder = await this.prisma.folders.findUniqueOrThrow({
                    where: { fid: fid },
                    select: { users: { select: { uid: true }}}
                })
                if (!(uid_token && uid_token == folder.users.uid)) throw new AuthenticationError("the sended fid is not allowed to modify by the id")
                const countDeletedFolderposts = await this.prisma.folder_posts.deleteMany({
                    where: {
                        fid: fid
                    }
                })
                const deletedFolder = await this.prisma.folders.delete({
                    where: { fid: fid }
                })
                return deletedFolder
            })
            return transaction
        } catch (error) { throw error }
    }
}
