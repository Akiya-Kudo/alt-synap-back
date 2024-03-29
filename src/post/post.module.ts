import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { PrismaModule } from '../_prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { TagModule } from '../tag/tag.module';
import { RedisModule } from '../_redis/redis.module';

@Module({
    imports: [PrismaModule, AuthModule, TagModule, RedisModule],
    providers: [PostResolver, PostService],
    exports: [PostResolver, PostService],
})
export class PostModule {}
