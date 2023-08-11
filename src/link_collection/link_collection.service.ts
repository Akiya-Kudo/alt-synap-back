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
                include: {
                    links: {
                        include: {
                            users: {
                                select: {
                                    uuid_uid: true,
                                    user_name: true,
                                    user_image: true,
                                }
                            }
                        }
                    }
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
                },
                include: {
                    links: true
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

    async deleteLinkCollection(lid: number, uuid_uid: string) {
        // return this.prisma.link_collections.delete({
        //     where: {
        //         // lid_cid: {
        //         //     lid: lid,
        //         //     cid: cid
        //         // },
        //         lid_cid: {
        //             lid: lid
        //         }
        //     }
        //     全てのuserのlidが該当するli_colを削除する必要があります
        // })
        try {
            const userLinkCollections_select_by_lid = await this.prisma.link_collections.findMany({
                where: {
                    lid: lid,
                    uuid_uid: uuid_uid,
                }
            })
            //全てのlink_collectionがユーザのcollectinで使用されていないかの確認
            userLinkCollections_select_by_lid.forEach((li_col: LinkCollection) => {
                if (li_col.deleted==false) {
                    throw new HttpException("error there are links which is included by your collections", HttpStatus.BAD_REQUEST)
                }
            })
            const deleted = await this.prisma.link_collections.deleteMany({
                where: {
                    lid: lid,
                    uuid_uid: uuid_uid
                }
            })
            
            return userLinkCollections_select_by_lid //clientのキャッシュを削除するために使用
        } catch ( error ) {
            throw new HttpException("Faild to delete link_collection : " + error, HttpStatus.BAD_REQUEST)
        }
    }
}
