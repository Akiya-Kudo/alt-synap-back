import { Injectable } from '@nestjs/common';
import { PrismaService } from '../_prisma/prisma.service';

@Injectable()
export class UserTagService {
    constructor (private prisma: PrismaService) {}

    async UserTagCreateOrDelete(tid: number, uid_token: string) {
        try {
            // To get which userTag record is exist and handle it, get user's id
            const { uuid_uid } = await this.prisma.users.findUniqueOrThrow({
                where: { uid: uid_token },
                select: { uuid_uid: true }
            })
            const userTag = await this.prisma.user_tags.findUnique({
                where: { uuid_uid_tid: { uuid_uid: uuid_uid, tid: tid }}
            })
            if (userTag) {
                return await this.prisma.user_tags.delete({
                    where: { uuid_uid_tid: { uuid_uid: uuid_uid, tid: tid }}
                })
            } else {
                return await this.prisma.user_tags.create({
                    data: {
                        uuid_uid: uuid_uid,
                        tid: tid
                    }
                })
            }
        } catch (error) { throw error }
    }
}
