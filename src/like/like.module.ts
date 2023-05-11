import { Module } from '@nestjs/common';
import { LikeResolver } from './like.resolver';
import { LikeService } from './like.service';
import { PrismaModule } from 'src/_prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LikeResolver, LikeService],
  exports: [LikeResolver, LikeService],
})
export class LikeModule {}
