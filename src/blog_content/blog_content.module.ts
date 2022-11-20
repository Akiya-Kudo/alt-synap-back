import { Module } from '@nestjs/common';
import { BlogContentService } from './blog_content.service';
import { BlogContentResolver } from './blog_content.resolver';
import { PrismaModule } from 'src/_prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BlogContentService, BlogContentResolver],
  exports: [BlogContentService, BlogContentResolver],
})
export class BlogContentModule {}
