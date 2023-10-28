import { Injectable, NotFoundException } from '@nestjs/common';
import { log } from 'console';
import { PrismaService } from '../_prisma/prisma.service';

@Injectable()
export class LikeService {
    constructor (private prisma: PrismaService) {}

    async likeCreateOrDelete(uuid_pid, uid_token) {
        try {
            const transaction = await this.prisma.$transaction(async (prisma) => {
                // To get like record is exist and handle it, get user's id
                const { uuid_uid } = await this.prisma.users.findUniqueOrThrow({
                    where: { uid: uid_token },
                    select: { uuid_uid: true }
                })
                // check whick the record is exist or not
                const like = await this.prisma.likes.findUnique({
                    where: {
                        uuid_uid_uuid_pid: {
                            uuid_pid: uuid_pid,
                            uuid_uid: uuid_uid
                        }
                    }
                })
                if (like) {
                    await this.prisma.posts.update({
                        where: { uuid_pid: uuid_pid },
                        data: {
                            likes_num: { decrement: 1 }
                        }
                    })
                    return await this.prisma.likes.delete({
                        where: { uuid_uid_uuid_pid: {
                            uuid_pid: uuid_pid,
                            uuid_uid: uuid_uid
                        }}
                    })
                } else {
                    await this.prisma.posts.update({
                        where: { uuid_pid: uuid_pid },
                        data: {
                            likes_num: { increment: 1 }
                        }
                    })
                    return await this.prisma.likes.create({
                        data: {
                            uuid_pid: uuid_pid,
                            uuid_uid: uuid_uid,
                        }
                    })
                }
            })
            return transaction
        } catch (error) {
            throw error
        }
    }
}
