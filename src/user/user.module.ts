import { Module } from '@nestjs/common';
import { PrismaModule } from '../_prisma/prisma.module';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { CollectionModule } from '../collection/collection.module';
import { AuthModule } from '../auth/auth.module';
import { RedisModule } from '../_redis/redis.module';

@Module({
  imports: [PrismaModule, AuthModule, CollectionModule, RedisModule],
  providers: [UserService, UserResolver],
  exports: [UserService, UserResolver],
})
export class UserModule {}
