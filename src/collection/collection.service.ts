import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { Collection } from './collection.model';
import { v4 as uuidv4 } from 'uuid';
import { Redis } from 'ioredis';

@Injectable()
export class CollectionService {
    constructor(
        private prisma: PrismaService,
        @Inject('REDIS_CLIENT') private readonly redis: Redis
        ) {}

    async updateCollectionToDeleted(cid: number): Promise<Collection> {
        return await this.prisma.collections.update({
            where: {
                cid: cid 
            },
            data: {
                deleted: true,
                link_collections: {
                    updateMany: {
                        where: { cid: cid },
                        data: { deleted: true }
                    }
                }
            },
            include: {
                link_collections: true,
            }
        })
    }

    async createCollection( collection_name: string, uuid_uid: string ): Promise<Collection> {
        return await this.prisma.collections.create({
            data: {
                collection_name: collection_name,
                uuid_uid: uuid_uid,
            },
            include: {
                link_collections: true
            }
        })
    }

    async setTopCollection( cid: number, uid_token: string ) {
        try {
            const { uuid_uid } = await this.prisma.users.findUniqueOrThrow({
                where: { uid: uid_token },
                select: { uuid_uid: true }
            })
            await this.redis.hset( "top_display_cids", uuid_uid, cid)
            const top_cid = await this.redis.hget("top_display_cids", uuid_uid)
            return ({
                uuid_uid: uuid_uid,
                top_collection: top_cid
            })
        } catch (error) { throw error }
    }
}
