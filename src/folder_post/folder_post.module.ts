import { Module } from '@nestjs/common';
import { FolderPostResolver } from './folder_post.resolver';
import { FolderPostService } from './folder_post.service';
import { PrismaModule } from 'src/_prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FolderPostResolver, FolderPostService],
  exports: [FolderPostResolver, FolderPostService]
})
export class FolderPostModule {}
