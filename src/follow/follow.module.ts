import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowResolver } from './follow.resolver';
import { PrismaModule } from 'src/_prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FollowService, FollowResolver],
  exports: [FollowService, FollowResolver],
})
export class FollowModule {}
