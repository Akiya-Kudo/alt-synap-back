import { Module } from '@nestjs/common';
import { LinkCollectionResolver } from './link_collection.resolver';
import { LinkCollectionService } from './link_collection.service';
import { PrismaModule } from '../_prisma/prisma.module';
import { RedisModule } from '../_redis/redis.module';

@Module({
  imports: [PrismaModule, RedisModule],
  providers: [LinkCollectionResolver, LinkCollectionService],
  exports: [LinkCollectionResolver, LinkCollectionService]
})
export class LinkCollectionModule {}
