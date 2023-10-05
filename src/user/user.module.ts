import { Module } from '@nestjs/common';
import { PrismaModule } from '../_prisma/prisma.module';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { CollectionModule } from 'src/collection/collection.module';
import { AuthModule } from 'src/auth/auth.module';
import { RedisModule } from 'src/_redis/redis.module';

@Module({
  imports: [PrismaModule, AuthModule, CollectionModule, RedisModule],
  providers: [UserService, UserResolver],
  exports: [UserService, UserResolver],
})
export class UserModule {}
