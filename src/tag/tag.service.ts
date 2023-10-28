import { Inject, Injectable } from '@nestjs/common';
import { log } from 'console';
import { Redis } from 'ioredis';
import { PrismaService } from '../_prisma/prisma.service';

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
            const res = await this.redis.zrange( "tag_ranking", 0, 9, "REV" )
            const tids_top = res.map(Number)
            const tags = await this.prisma.tags.findMany({
                where: {tid: { in: tids_top }}
            })
            
            return tags.sort((a, b) => {
                return tids_top.indexOf(a.tid) - tids_top.indexOf(b.tid)
            })
        } catch (error) { throw error }
    }

    async addjustTagRanking () {
        try {
            const tidAndScoreArrayTop100 = await this.redis.zrevrange("tag_ranking", 0, -1, "WITHSCORES");
            const tagsTop100 = [];
    
            for (let i = 0; i < tidAndScoreArrayTop100.length; i += 2) {
                const tid = tidAndScoreArrayTop100[i];
                const score = parseInt(tidAndScoreArrayTop100[i + 1], 10) / 2;
                tagsTop100.push({ tid, score: score.toString() });
            }
            
            const tidAndScoreArrayTop100New = tagsTop100.flatMap(tag => [tag.score, tag.tid]);
            let insertTagsTop100 = null
            if (tagsTop100.length > 0) {
                insertTagsTop100 = await this.redis.zadd("tag_ranking", ...tidAndScoreArrayTop100New);
            }

            // for (let i = 0; i < 30; i+=1) {
            //     insertTagsTop100 = await this.redis.zadd("tag_ranking", 111+i,111+i,222+i,222+i,333+i,333+i,444+i,444+i,555+i,555+i,666+i,666+i,777+i,777+i,888+i,888+i,999+i,999+i);
            // }

            
            const len = await this.redis.zcard("tag_ranking")
            const deletedTagRankingBack100 = await this.redis.zremrangebyrank("tag_ranking", 0, len - 101);
            return tagsTop100;
        } catch (error) { throw error }
    }
}