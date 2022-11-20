import { Module } from '@nestjs/common';
import { SlideContentService } from './slide_content.service';
import { SlideContentResolver } from './slide_content.resolver';
import { PrismaModule } from 'src/_prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SlideContentService, SlideContentResolver],
  exports: [SlideContentService, SlideContentResolver],
})
export class SlideContentModule {}
