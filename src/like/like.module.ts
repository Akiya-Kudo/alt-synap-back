import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { PrismaModule } from 'src/_prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LikeService, LikeResolver],
  exports: [LikeService, LikeResolver],
})
export class LikeModule {}
