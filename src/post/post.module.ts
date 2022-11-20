import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PrismaModule } from 'src/_prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PostService, PostResolver],
  exports: [PostService, PostResolver],
})
export class PostModule {}
