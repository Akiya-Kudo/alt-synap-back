import { Module } from '@nestjs/common';
import { SourceContentResolver } from './source_content.resolver';
import { SourceContentService } from './source_content.service';
import { PrismaModule } from 'src/_prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SourceContentResolver, SourceContentService],
  exports: [SourceContentResolver, SourceContentService],
})
export class SourceContentModule {}
