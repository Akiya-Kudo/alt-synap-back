import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { PrismaModule } from 'src/_prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CommentService, CommentResolver],
  exports: [CommentService, CommentResolver],
})
export class CommentModule {}
