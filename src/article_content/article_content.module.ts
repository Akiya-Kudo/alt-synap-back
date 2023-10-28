import { Module } from '@nestjs/common';
import { ArticleContentResolver } from '../article_content/article_content.resolver';
import { ArticleContentService } from '../article_content/article_content.service';
import { PrismaModule } from '../_prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ArticleContentResolver, ArticleContentService],
  exports: [ArticleContentResolver, ArticleContentService],
})
export class ArticleContentModule {}
