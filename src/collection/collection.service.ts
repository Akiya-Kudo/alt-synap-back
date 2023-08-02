import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { Collection } from './collection.model';

@Injectable()
export class CollectionService {
    constructor(private prisma: PrismaService) {}

    async userCollections(uuid_uid: string) : Promise<Collection[]>{
        try {
            return await this.prisma.collections.findMany({
                where: {
                    uuid_uid: uuid_uid,
                    deleted: false,
                },
                select: {
                    cid: true,
                    collection_name: true,
                    link_collections: {
                        select: {
                            links: true
                        }
                    }
                }
            })
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
                        data: {
                            deleted: true
                        }
                    }
                }
            },
            include: {
                link_collections: true
            }
        })
    }
}
