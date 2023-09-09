import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { PrismaService } from 'src/_prisma/prisma.service';

@Injectable()
export class FollowService {
    constructor (private prisma: PrismaService) {}


    // when getting follower(フォロー中) list => get it's followee info & followee's followee list of onlu login user( 1 or 0 length )
    // when getting followee(フォロワー) list　 => get it's follower info & follower's followee list of only login user( 1 or 0 length )
    async getFollowList(
        uuid_uid: string, 
        is_follower_list: boolean,
        offset: number,
        uid_token: string
    ) {
        
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
            return await this.prisma.follows.findMany({
                where: is_follower_list 
                    ? { follower_uuid: uuid_uid }
                    : { followee_uuid: uuid_uid },
                include: is_follower_list 
                    ? { users_follows_followee_uuidTousers: {
                        select: {
                            uuid_uid: true,
                            user_name: true,
                            user_image: true,
                            follows_follows_followee_uuidTousers: _uuid_uid ? { where: { follower_uuid: _uuid_uid } } : { take: 0 }
                        }
                    }}
                    : { users_follows_follower_uuidTousers: {
                        select: {
                            uuid_uid: true,
                            user_name: true,
                            user_image: true,
                            follows_follows_followee_uuidTousers: _uuid_uid ? { where: { follower_uuid: _uuid_uid } } : { take: 0 }
                        }
                    }},
                take: 50,
                skip: offset
            })
        } catch (error) {
            throw error
        }
    }

    async FollowCreateOrDelete( followee_uuid: string, uid_token: string ) {
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
