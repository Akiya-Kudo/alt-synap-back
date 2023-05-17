import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { upsertPostInput } from 'src/custom_models/mutation.model';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async upsertPost(upsertPostValue: upsertPostInput) {
        const newone = {deleted: false}
        upsertPostValue.publish = false
        const tags = []
        upsertPostValue.tag_names.map((tag_name, index) => {
            tags.push({
                id: index,
                tid: index,
                pid: index,
            })
        });
        delete upsertPostValue.tag_names
        const output = {...upsertPostValue, ...newone, post_tags: tags}
        console.log(output)
        return output
    }
}