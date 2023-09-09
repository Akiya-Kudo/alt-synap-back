import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';

@Injectable()
export class FollowService {
    constructor (private prisma: PrismaService) {}

    async LikeCreateOrDelete( followee_uuid: string, uid_token: string ) {
        try {
            const transaction = await this.prisma.$transaction(async (prisma) => {
                // To get like record is exist and handle it, get user's id
                const { uuid_uid } = await this.prisma.users.findUniqueOrThrow({
                    where: { uid: uid_token },
                    select: { uuid_uid: true }
                })
                // check whick the record is exist or not
                const follow = await this.prisma.follows.findUnique({
                    where: {
                        follower_uuid_followee_uuid: {
                            followee_uuid: followee_uuid,
                            follower_uuid: uuid_uid,
                        }
                    }
                })
                if (follow) {
                    await this.prisma.users.update({
                        where: { uuid_uid: uuid_uid },
                        data: {
                            follower_num: { decrement: 1 }
                        }
                    })
                    await this.prisma.users.update({
                        where: { uuid_uid: followee_uuid },
                        data: {
                            followee_num: { decrement: 1 }
                        }
                    })
                    return await this.prisma.follows.delete({
                        where: { follower_uuid_followee_uuid: {
                            followee_uuid: followee_uuid,
                            follower_uuid: uuid_uid,
                        }}
                    })
                } else {
                    await this.prisma.users.update({
                        where: { uuid_uid: uuid_uid },
                        data: {
                            follower_num: { increment: 1 }
                        }
                    })
                    await this.prisma.users.update({
                        where: { uuid_uid: followee_uuid },
                        data: {
                            followee_num: { increment: 1 }
                        }
                    })
                    return await this.prisma.follows.create({
                        data: {
                            followee_uuid: followee_uuid,
                            follower_uuid: uuid_uid,
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
