import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { PrismaModule } from 'src/_prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [PostResolver, PostService],
    exports: [PostResolver, PostService],
})
export class PostModule {}
