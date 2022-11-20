import { Module } from '@nestjs/common';
import { PostsTagService } from './posts_tag.service';
import { PostsTagResolver } from './posts_tag.resolver';
import { PrismaModule } from 'src/_prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PostsTagService, PostsTagResolver],
  exports: [PostsTagService, PostsTagResolver],
})
export class PostsTagModule {}
