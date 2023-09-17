import { Module } from '@nestjs/common';
import { FolderPostResolver } from './folder_post.resolver';
import { FolderPostService } from './folder_post.service';
import { PrismaModule } from 'src/_prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [FolderPostResolver, FolderPostService],
  exports: [FolderPostResolver, FolderPostService]
})
export class FolderPostModule {}
