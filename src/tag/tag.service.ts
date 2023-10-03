import { Inject, Injectable } from '@nestjs/common';
import { log } from 'console';
import { Redis } from 'ioredis';
import { PrismaService } from 'src/_prisma/prisma.service';

@Injectable()
export class TagService {
    constructor(
        private prisma: PrismaService,
        @Inject('REDIS_CLIENT') private readonly redis: Redis
        ) {}
    async searchTags(
        words: string[]
    ) {
        let res_tags_conbined = []
        if (words.length > 1) {
            let conbained_conditions = []
            words.map( (word, _i) => _i!==0 && conbained_conditions.push({ tag_name: { startsWith: words[_i-1] + words[_i] } }) )
            res_tags_conbined = await this.prisma.tags.findMany({
                where: {
                    OR: conbained_conditions
                },
                select: {
                    tid: true,
                    display_name: true,
                    tag_image: true,
                    tag_content_num: true
                },
                take: 5,
                orderBy: {
                    tag_content_num: 'desc',
                }
            })
        }

        const tag_conditions = words.map(tag => ({ tag_name: { startsWith: tag } }))
        const res_tags_single = await this.prisma.tags.findMany({
            where: {
                OR: tag_conditions
            },
            select: {
                tid: true,
                display_name: true,
                tag_image: true,
                tag_content_num: true
            },
            take: 5,
            orderBy: {
                tag_content_num: 'desc',
            }
        })

        let res_tags = [...res_tags_conbined, ...res_tags_single]
        res_tags = res_tags.filter((v, i, a) => a.findIndex(t => (t.tid === v.tid)) === i)
        return res_tags
    }

    async findTag( tid: number ) {
        try {
            return await this.prisma.tags.findUniqueOrThrow({
                where: {
                    tid: tid
                }
            })
        } catch (error) {
            throw error
        }
    }

    async getTagRankingList () {
        try {
            const res = await this.redis.zrange( "tag_ranking", 0, 10, "REV" )
            const tids = res.map(Number)
            return await this.prisma.tags.findMany({
                where: {tid: { in: tids }}
            })
        } catch (error) { throw error }
    }
}