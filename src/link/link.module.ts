import { Module } from '@nestjs/common';
import { LinkResolver } from './link.resolver';
import { PrismaModule } from 'src/_prisma/prisma.module';
import { LinkService } from './link.service';

@Module({
  imports: [PrismaModule],
  providers: [LinkResolver, LinkService],
  exports: [LinkResolver, LinkService]
})
export class LinkModule {}