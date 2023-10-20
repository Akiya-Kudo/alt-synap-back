
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { Link } from './link.model';
import { createLinkInput } from 'src/custom_models/mutation.model';
import { Redis } from 'ioredis';


@Injectable()
export class LinkService {
    constructor( 
        private prisma: PrismaService,
        @Inject('REDIS_CLIENT') private readonly redis: Redis
        ) {}

    async createLink(linkData: createLinkInput, uid_token: string): Promise<Link> {
        try {
            const {link_name, url_scheme, genre } = linkData // not null
            const { image_path, explanation, query, joint, other_queries, publish, is_path_search } = linkData // nullable
    
            // get uuid_uid
            const { uuid_uid } = await this.prisma.users.findUniqueOrThrow({
                where: { uid: uid_token },
                select: { uuid_uid: true }
            })
    
            return await this.prisma.links.create({
                data: {
                    link_name,
                    url_scheme,
                    genre,
                    uuid_uid,
                    image_path,
                    explanation,
                    query,
                    joint,
                    other_queries,
                    publish,
                    is_path_search,
                },
                include: {
                    users: true
                }
            })
        } catch (error) {
            throw error
        }
    }

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
