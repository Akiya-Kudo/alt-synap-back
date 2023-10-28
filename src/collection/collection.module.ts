import { Module } from '@nestjs/common';
import { PrismaModule } from '../_prisma/prisma.module';
import { CollectionResolver } from './collection.resolver';
import { CollectionService } from './collection.service';
import { AuthModule } from '../auth/auth.module';
import { RedisModule } from '../_redis/redis.module';

@Module({
    imports: [PrismaModule, AuthModule, RedisModule],
    providers: [CollectionResolver, CollectionService],
    exports: [CollectionResolver, CollectionService],
})
export class CollectionModule {}