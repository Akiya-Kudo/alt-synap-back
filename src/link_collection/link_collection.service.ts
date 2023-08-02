import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { LinkCollection } from './link_collection.model';

@Injectable()
export class LinkCollectionService {
    constructor(private prisma: PrismaService) {}

    async getUserLinkCollection(uuid_uid: string): Promise<LinkCollection[]> {
        try {
            return await this.prisma.link_collections.findMany({
                where: {
                    uuid_uid: uuid_uid,
                },
                select: {
                    links: true
                }
            })
        } catch ( error ) {
            throw new HttpException("Faild to get link collections from db", HttpStatus.BAD_REQUEST)
        }
    }

    async upsertLinkCollection(lid: number, cid: number, uuid_uid: string) {
        try {
            return this.prisma.link_collections.upsert({
                where: {
                    lid_cid: {
                        lid: lid,
                        cid: cid,
                    }
                },
                update: {
                    deleted: false
                },
                create: {
                    lid: lid,
                    cid: cid,
                    uuid_uid: uuid_uid
                }
            })
        } catch ( error ) {
            throw new HttpException("Faild to upsert link_collection", HttpStatus.BAD_REQUEST)
        }
    }

    async updateLinkCollectionToDeleted(lid: number, cid: number) {
        return this.prisma.link_collections.update({
            where: {
                lid_cid: {
                    lid: lid,
                    cid: cid
                }
            },
            data: {
                deleted: true
            }
        })
    }

    async deleteLinkCollection(lid: number, cid: number) {
        return this.prisma.link_collections.delete({
            where: {
                lid_cid: {
                    lid: lid,
                    cid: cid
                },
            }
        })
    }
}
