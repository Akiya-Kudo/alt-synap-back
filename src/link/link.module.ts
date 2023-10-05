import { Module } from '@nestjs/common';
import { LinkResolver } from './link.resolver';
import { PrismaModule } from 'src/_prisma/prisma.module';
import { LinkService } from './link.service';
import { AuthModule } from 'src/auth/auth.module';
import { RedisModule } from 'src/_redis/redis.module';

@Module({
  imports: [PrismaModule, AuthModule, RedisModule],
  providers: [LinkResolver, LinkService],
  exports: [LinkResolver, LinkService]
})
export class LinkModule {}