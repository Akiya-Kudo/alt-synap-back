import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { upsertArticlePostInput } from 'src/custom_models/mutation.model';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async upsertArticlePost(postData: upsertArticlePostInput) {
        const tags = []
        postData.tag_names.map((tag_name, index) => {
            tags.push({
                tid: index,
                uuid_pid: index,
            })
        });
        delete postData.tag_names
        const output = {...postData, post_tags: tags}
        console.log(output)
        return output
    }
}