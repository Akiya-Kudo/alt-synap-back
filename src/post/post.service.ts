import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { PrismaService } from 'src/_prisma/prisma.service';
import { upsertArticlePostInput } from 'src/custom_models/mutation.model';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async upsertArticlePost(postData: upsertArticlePostInput) {
        console.log(postData);
        delete postData.articleContent
        delete postData.tags
        delete postData.uid
        return postData
        
    }
}