import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../_prisma/prisma.service';
import { users, Prisma } from '@prisma/client';
import { User } from './user.model';
import { updateUserInput } from 'src/custom_models/mutation.model';
import { log } from 'console';
import { Redis } from 'ioredis';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis
    ) {}

  async user(uid: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {uid: uid},
        select: {
          uuid_uid: true,
          user_name: true,
          user_image: true,
          comment: true,
          followee_num: true,
          follower_num: true,
          lang_type: true,

          collections: {
            where: {deleted: false},
            include: {

              link_collections: {
                where: {deleted: false},
                include: {
                  links: {
                    include: {
                      users: { select: { uuid_uid: true, user_name: true, user_image: true }}
                    }
                  }
                }
              }
            }
          },
          folders: {
            orderBy: { timestamp: "desc" }
          },

          user_tags: {
            include: { tags: true },
            orderBy: {timestamp: "desc"}
          }
        }
      });
      if (user) {
        const top_cid = await this.redis.hget("top_display_cids", user.uuid_uid)
        return ({
          ...user,
          top_collection: top_cid
        })
      } else {
        return null
      }
    } catch (error) { throw error }
  }

  async other_user(
    uuid_uid: string,
    uid_token: string | null,
  ): Promise<User> {
    try {
      let requesting_user_uuid_uid = undefined
      if (uid_token) {
          // get uuid_uid
          const { uuid_uid } = await this.prisma.users.findUniqueOrThrow({
              where: { uid: uid_token },
              select: { uuid_uid: true }
          })
          requesting_user_uuid_uid = uuid_uid
      }
  
      return this.prisma.users.findUnique({
        where: {
          uuid_uid: uuid_uid
        },
        select: {
          uuid_uid: true,
          user_name: true,
          user_image: true,
          comment: true,
          follower_num: true,
          followee_num: true,
          follows_follows_followee_uuidTousers: requesting_user_uuid_uid ? { where: { follower_uuid: requesting_user_uuid_uid } } : { take: 0 }
        }
      });
    } catch(error) { throw error }
  }

  async usersAll() {
    return this.prisma.users.findMany();
  }

  async createUser(data: Prisma.usersCreateInput): Promise<User> {
    try {
      const user_exist = await this.prisma.users.findUnique({
        where: {uid: data.uid},
        select: {
          uuid_uid: true,
          user_name: true,
          user_image: true,
          comment: true,
          follower_num: true,
          followee_num: true,
          lang_type: true
        }
      })
      if (!user_exist) {
        return this.prisma.users.create({ 
          data,
          select: {
            uuid_uid: true,
            user_name: true,
            user_image: true,
            comment: true,
            follower_num: true,
            followee_num: true,
            lang_type: true
          }
        });
      } else {
        return user_exist
      }
    } catch (error) { throw error }
  }

  async updateUser(userData: updateUserInput, uid_token: string) {
    try {
      const { uuid_uid } = await this.prisma.users.findUniqueOrThrow({
        where: { uid: uid_token},
        select: { uuid_uid: true }
      })
      return await this.prisma.users.update({
        where: { uuid_uid: uuid_uid },
        data: {
          user_name: userData.user_name,
          user_image: userData.user_image,
          comment: userData.comment
        },
        select: {
          uuid_uid: true,
          user_name: true,
          user_image: true,
          comment: true,
        }
      })
    } catch (error) {throw error}
  }

  async deleteUser(where: Prisma.usersWhereUniqueInput): Promise<users> {
    return this.prisma.users.delete({
      where,
    });
  }
}
