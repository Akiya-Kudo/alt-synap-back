import { Module } from '@nestjs/common';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';
import { PrismaModule } from 'src/_prisma/prisma.module';
import { RedisModule } from 'src/_redis/redis.module';

@Module({
  imports: [PrismaModule, RedisModule],
  providers: [TagResolver, TagService],
  exports: [TagResolver, TagService],
})
export class TagModule {}
