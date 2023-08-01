import { Module } from '@nestjs/common';
import { LinkCollectionResolver } from './link_collection.resolver';
import { LinkCollectionService } from './link_collection.service';
import { PrismaModule } from 'src/_prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LinkCollectionResolver, LinkCollectionService],
  exports: [LinkCollectionResolver, LinkCollectionService]
})
export class LinkCollectionModule {}
