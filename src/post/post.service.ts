import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { createPostInput } from './post.model';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async createPost(createPost: createPostInput) {
        console.log(createPost)
    }
}