import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';

@Injectable()
export class TagService {
    constructor(private prisma: PrismaService) {}
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
                take: 10,
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
            take: 10,
            orderBy: {
                tag_content_num: 'desc',
            }
        })

        let res_tags = [...res_tags_conbined, ...res_tags_single]
        res_tags = res_tags.filter((v, i, a) => a.findIndex(t => (t.tid === v.tid)) === i)
        return res_tags
    }
}