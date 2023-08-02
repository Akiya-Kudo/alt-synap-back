
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { Link } from './link.model';


@Injectable()
export class LinkService {
    constructor( private prisma: PrismaService ) {}

    async getAllPublishedLinks(): Promise<Link[]> {
        return await this.prisma.links.findMany({
            where: {
                publish: true
            },
            include: {
                users: {
                    select: {
                        uuid_uid: true,
                        user_name: true,
                        user_image: true,
                    }
                }
            }
        })
    }

    async getUserLink( uuid_uid: string ): Promise<Link[]> {
        return await this.prisma.links.findMany({
            where: {
                uuid_uid: uuid_uid
            }
        })
    }

    async deleteLink(lid: number ): Promise<Link> {
        try {
            const deld_lin_coll_count = await this.prisma.link_collections.deleteMany({
                where: {
                    lid: lid
                }
            })
            console.log(deld_lin_coll_count + "個のlink_collectionが削除されました。")
            return await this.prisma.links.delete({
                where: {
                    lid: lid
                }
            })
        } catch (error) {
            throw new HttpException("Faild to delete link & link_collection", HttpStatus.BAD_REQUEST)
        }
    }
}
