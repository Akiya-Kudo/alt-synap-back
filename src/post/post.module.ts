import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { PrismaModule } from 'src/_prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { TagModule } from 'src/tag/tag.module';
import { RedisModule } from 'src/_redis/redis.module';

@Module({
    imports: [PrismaModule, AuthModule, TagModule, RedisModule],
    providers: [PostResolver, PostService],
    exports: [PostResolver, PostService],
})
export class PostModule {}
