import { Module } from '@nestjs/common';
import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';
import { PrismaModule } from '../_prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [FollowResolver, FollowService],
  exports: [FollowResolver, FollowService],
})
export class FollowModule {}
