import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { Collection } from './collection.model';
import { log } from 'console';

@Injectable()
export class CollectionService {
    constructor(private prisma: PrismaService) {}

    async userCollections(uuid_uid: string) : Promise<Collection[]>{
        try {
            const user_collections = await this.prisma.collections.findMany({
                where: {
                    uuid_uid: uuid_uid,
                    deleted: false,
                },
                select: {
                    cid: true,
                    collection_name: true,
                    uuid_uid: true,
                    deleted: true,
                    link_collections: {
                        where: {
                            deleted: false,
                        },
                        select: { 
                            lid: true,
                            cid: true,
                            uuid_uid: true,
                            deleted: true,
                            links: true ,
                        }
                    }
                }
            })
            console.log(user_collections);
            return user_collections
        } catch ( error ) {
            throw new HttpException("Faild to count total hit Posts", HttpStatus.BAD_REQUEST)
        }
    }

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
                link_collections: true
            }
        })
    }
}
