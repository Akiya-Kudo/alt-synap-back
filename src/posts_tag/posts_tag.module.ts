import { Module } from '@nestjs/common';
import { PostsTagResolver } from './posts_tag.resolver';
import { PostsTagService } from './posts_tag.service';
import { PrismaModule } from 'src/_prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PostsTagResolver, PostsTagService],
  exports: [PostsTagResolver, PostsTagService],
})
export class PostsTagModule {}
