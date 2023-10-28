import { Module } from '@nestjs/common';
import { LinkResolver } from './link.resolver';
import { PrismaModule } from '../_prisma/prisma.module';
import { LinkService } from './link.service';
import { AuthModule } from '../auth/auth.module';
import { RedisModule } from '../_redis/redis.module';

@Module({
  imports: [PrismaModule, AuthModule, RedisModule],
  providers: [LinkResolver, LinkService],
  exports: [LinkResolver, LinkService]
})
export class LinkModule {}