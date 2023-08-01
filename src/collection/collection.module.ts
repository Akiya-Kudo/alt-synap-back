import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/_prisma/prisma.module';
import { CollectionResolver } from './collection.resolver';
import { CollectionService } from './collection.service';

@Module({
    imports: [PrismaModule],
    providers: [CollectionResolver, CollectionService],
    exports: [CollectionResolver, CollectionService],
})
export class CollectionModule {}