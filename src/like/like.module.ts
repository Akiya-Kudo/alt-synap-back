import { Module } from '@nestjs/common';
import { LikeResolver } from './like.resolver';
import { LikeService } from './like.service';
import { PrismaModule } from 'src/_prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [LikeResolver, LikeService],
  exports: [LikeResolver, LikeService],
})
export class LikeModule {}
