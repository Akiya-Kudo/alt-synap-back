import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/_prisma/prisma.module';
import { CollectionResolver } from './collection.resolver';
import { CollectionService } from './collection.service';
import { AuthModule } from 'src/auth/auth.module';
import { RedisModule } from 'src/_redis/redis.module';

@Module({
    imports: [PrismaModule, AuthModule, RedisModule],
    providers: [CollectionResolver, CollectionService],
    exports: [CollectionResolver, CollectionService],
})
export class CollectionModule {}